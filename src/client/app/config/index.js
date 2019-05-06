import * as dotenv from 'dotenv';

dotenv.config();

export default {
    url: process.env.APP_ENV === 'dev' ? 'http://localhost:4800/api' : 'ec2-18-219-247-19.us-east-2.compute.amazonaws.com:4800/api'
}
