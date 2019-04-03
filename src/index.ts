import connect from 'connect';
import cors from 'cors';
import { renderMiddleware } from './render-middleware';

const app = connect();

app.use(cors());
app.use('/render', renderMiddleware());

app.listen(process.env.PORT || 3000);
