import express from 'express';
import querystring from 'node:querystring';
import {nanoid} from 'nanoid';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const app = express();

dotenv.config();

const port = process.env.PORT;
const oktaDomain = process.env.OKTA_DOMAIN
const clientID = process.env.OKTA_CLIENT_ID
const clientSecret = process.env.OKTA_CLIENT_SECRET
const cookieSecret = process.env.COOKIE_SECRET

app.use(cookieParser(cookieSecret));

app.use('/login', (req, res, next) => {
    const state = nanoid();

    res.cookie("state", state, { maxAge: 1000 * 60 * 5, signed: true });

    const qs = querystring.encode({
        response_type: 'code',
        client_id: clientID,
        redirect_uri:`http://localhost:${port}/authorization-code/callback`,
        scope: ['openid'],
        state,
    })

    res.redirect(
        `https://${oktaDomain}/oauth2/default/v1/authorize?${qs}`
    )
});

app.use('/authorization-code/callback', async (req, res, next) => {
    const { code, state } = req.query;
    const { state: stateParam } = req.signedCookies;

    // validate state to ensure against XSRF
    if (state !== stateParam) {
        res.status(400).send("Invalid state, unable to authenticate");
        return;
    }
    const qs = querystring.encode({
        "grant_type": 'authorization_code',
        "redirect_uri": `http://localhost:${port}/authorization-code/callback`,
        "code": code as string,
    })
    let buff = new Buffer(`${clientID}:${clientSecret}`);
    let base64Secret = buff.toString('base64');

    try {
        const oktaResponse = await fetch(`https://${oktaDomain}/oauth2/default/v1/token`, {
            method: 'POST',
            body: qs,
            headers: {
                'authorization': `Basic ${base64Secret}`
            }
        })
        if (oktaResponse.status !== 200) {
            throw Error("failed")
        }

        const body = await oktaResponse.json()
        return res.status(200).send(body)
    } catch (e) {
        res.status(400).send(e)
        return
    }
    }
);

app.listen(port, () => {
    console.log(`[server]: Running on localhost:${port}`)
});
