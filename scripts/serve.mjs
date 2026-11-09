import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {resolve, extname, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server = http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url,'http://localhost');
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
    if(relative.split('/').some(part => part.startsWith('.') || part === 'scripts' || part === 'docs')) {res.writeHead(404);res.end('Not found');return;}
    let file = resolve(root,relative);
    if(file !== root && !file.startsWith(root.endsWith(sep) ? root : root+sep)) {res.writeHead(403);res.end('Forbidden');return;}
    if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
    const body=await readFile(file);
    res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  } catch {res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
const flag = process.argv.indexOf('--port');
const port = Number(process.env.PORT || (flag >= 0 ? process.argv[flag + 1] : 3000));
server.listen(port,'0.0.0.0',()=>console.log(`Akasha preview listening on ${port}`));
