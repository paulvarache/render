import connect, { SimpleHandleFunction } from 'connect';
import cors from 'cors';
import { renderMiddleware } from './render-middleware';
import { defaultMiddleware } from './default-middleware';

const app = connect();

app.use(cors() as SimpleHandleFunction);
app.use('/render', renderMiddleware());
app.use(defaultMiddleware());

app.listen(process.env.PORT || 3000);
