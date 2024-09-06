import type {APIRoute} from "astro"; 
import { getEntry } from "astro:content";
export const prerender = false;

export const GET: APIRoute =  (async({params, request}) => {
    const {slug} = params;

    const post = await getEntry("blog", slug);

    if (!post){
        return new Response(JSON.stringify({msg: `Post: ${slug} not found`}), {status:404, headers: {"Content-type": 'application/json'}})
    }

    return new Response(JSON.stringify(post), {status:200, headers: {"Content-type": 'application/json'}})
})