import url from 'url';
import connect from 'connect';
import { render } from './render';

interface IRequestParams {
    [K : string] : string|boolean;
}

function parseQuery(queryString : string) : IRequestParams {
    const pieces = queryString.split('&');
    return pieces.reduce((acc, item) => {
        const bits = item.split('=');
        if (bits.length === 2) {
            acc[bits[0]] = bits[1];
        } else if (bits.length === 1) {
            acc[bits[0]] = true;
        }
        return acc;
    }, {} as IRequestParams);
}

export function renderMiddleware() : connect.NextHandleFunction {
    return (req, res) => {
        const parsed = url.parse(req.url || '');
        const { query } = parsed;
        const params = parseQuery(query || '');
        if (typeof params.url !== 'string') {
            res.setHeader('Status', 400);
            res.end(`Could not render: Missing param 'url'`);
        }
        console.log(`Requested render for '${params.url}'`);
        return render(params.url as string)
            .then((img) => {
                console.log(`'${params.url}' rendered`);
                res.setHeader('Content-Type', 'image/png');
                res.end(img);
            })
            .catch((e) => {
                console.error(e);
                res.setHeader('Status', 500);
                res.end(e.message);
            });
    };
}
