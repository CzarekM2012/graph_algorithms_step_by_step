(()=>{var i,D={9280:(i,f,n)=>{"use strict";var E=n(5595),c=n(4651),r=n(6671),a=n(8610),d=n(6215),m=n(1507);const $="distance",C="heuristic",g="predecessor",A="predecessorKey",l="cost";function w(e,o,u){const s=[];return s.push(a.X.setProperty(e,o.desc,$,o.dist)),s.push(a.X.setProperty(e,o.desc,C,o.heur)),s.push(a.X.setProperty(e,o.desc,A,u.desc.key)),s.push(a.X.setProperty(e,o.desc,g,u.label)),s}function y(e,o,u){const s=[new m.B(u,"node")];let v=u;for(;v!=o;){const h=e.getNodeAttribute(v,A);s.push(new m.B(h,"node"));const t=e.edge(v,h);s.push(new m.B(t,"edge")),v=h}return s}var _;!function(e){e.strings={description:`Widely used algorithm for finding the shortest path between nodes in a graph.\n        It works by extending paths starting in source node with nodes neighboring them, until destination node is found. Decision, which path should be extended and which node should be used for that, is based on value of heuristic function (approximation of the distance to the destination). For each of the nodes that can be used for extension of a path, length of the path that is closest to it, length of the edge connecting it with the end of that path and value of heuristic function are added together, node which has the lowest value of this sum is choosen.\n        Performance of the algorithm is heavily impacted by the accuracy of the used heuristic. Its one major drawback is the fact that all encountered nodes are stored in memory and there are algorithms that outperform it because of that, but it is still the best solution in many cases.\n\n        Each node is described by a set of attributes:\n        ${$} - length of the shortest path from the starting node to the node,\n        ${C} - approximation of the length of the shortest path from the starting node to the destination node, leading through the node,\n        ${g} - node that precedes the node on the path;\n\n        Each edge is described by a "cost" attribute which denotes the length of the edge.\n\n        Heuristic function used in this algorithm finds the minimum number of edges that needs to be traversed to move from the node to the destination and multiplies it by the "cost" of the shortest edge in the graph. Because of that, algorithm will be most effective on graphs with edges of similar length, on the other hand, graphs with both paths consisting of many short edges and those with fewer long edges will cause it to waste time extending paths with fewer edges.\n\n        "${(0,d.d4)(l)}" of each edge is required to be positive`,nodesAttributes:{distance:$,heuristic:C,predecessorLabel:g,predecessorKey:A},edgesAttributes:{cost:l}};const o="edges_from_destination",u="minimum_cost";function v(h,t){return h.getNodeAttribute(t,o)*h.getAttribute(u)}e.aStar=function s(h,t,N,P){h.setAttribute(u,function S(e){let o=1/0;return e.forEachEdge(u=>{const s=e.getEdgeAttribute(u,l);s<o&&(o=s)}),o}(h));const k=(0,c.jZ)(h,N);Object.entries(k).forEach(([B,O])=>{h.setNodeAttribute(B,o,O)}),function p(e,o,u,s,v){const h={desc:new m.B(o,"node"),dist:0,heur:v(e,o),label:e.getNodeAttribute(o,"label")};let t=new r.u;t.addChange(a.X.markElement(e,h.desc,"inspect")),t.addChange(a.X.setProperty(e,h.desc,$,h.dist)),t.addChange(a.X.setProperty(e,h.desc,C,h.heur));const N="starting node - no predecessor";t.addChange(a.X.setProperty(e,h.desc,g,N)),t.description=`Starting node (${h.label}) is the only node that can extend a path, its ${$} is set to ${h.dist}, ${C} - to the value of heuristic function (${h.heur}), and ${g} - to "${N}".\n          Since paths leading nodes other than the starting one are unknown, both their ${$} and ${C} are set to "Infinity" and their ${g} - to "?".`,s(t);const P=[{desc:new m.B(o,"node"),dist:e.getNodeAttribute(o,$),heur:e.getNodeAttribute(o,C),label:e.getNodeAttribute(o,"label")}];for(t=new r.u;P.length>0;){P.sort((O,R)=>O.heur-R.heur);const k=P[0];P.splice(0,1);const B=e.getNodeAttribute(k.desc.key,g);if(t.addChange(a.X.markElement(e,k.desc,"inspect")),t.description=`Node ${k.label} has the lowest value of ${C} from the set of nodes that can extend a path.\n        It extends the path leading through its predecessor (${B}), is choosen as current node and is removed from the set.`,s(t),k.desc.key==u){t=new r.u;const R=y(e,o,u).map(x=>a.X.markElement(e,x,"approve"));t.addChange(...R);const X=e.getNodeAttribute(u,"label");return t.description=`Destination node (${X}) has been choosen as current.\n      The shortest path from the starting node (${h.label}) to ${X} has been found.`,void s(t)}t=new r.u,e.forEachNeighbor(k.desc.key,O=>{const R=e.edge(k.desc.key,O),X={desc:new m.B(R,"edge"),cost:e.getEdgeAttribute(R,l)},x={desc:new m.B(O,"node"),dist:e.getNodeAttribute(O,$),heur:e.getNodeAttribute(O,C),label:e.getNodeAttribute(O,"label")},L=k.dist+X.cost;if(t.addChange(a.X.markElement(e,x.desc,"inspect")),t.addChange(a.X.markElement(e,X.desc,"inspect")),t.description=`Length of the shortest path from starting node (${h.label}) to ${x.label} through current node (${k.label}) equals ${L}.\n`,L<x.dist){const j=L+v(e,x.desc.key);t.description+=`This path is shorter than the current path from ${h.label} to ${x.label} (${L} < ${x.dist}).\n            "${(0,d.d4)($)}" of ${x.label} is set to the length of the shorter path (${L}).\n            "${(0,d.d4)(C)}" of ${x.label} is set to new approximation of length of the path from the starting node to the destination node (${j}).\n            Node ${k.label} is set as "${g}" of ${x.label}.\n            When ${x.label} will be choosen as current node, it will extend path leading through ${k.label}, unless shorter path that could be extended by it will be constructed beforehand.\n`,x.dist=L,x.heur=j,t.addChange(...w(e,x,k));const U=P.findIndex(F=>F.desc.isEqualTo(x.desc));-1!=U?(P[U]=x,t.description+=`${x.label} was already present in the set of nodes that can extend a path.`):(P.push(x),t.description+=`${x.label} is added to the set of nodes that can extend a path.`)}else{const j=e.getNodeAttribute(x.desc.key,g);t.description+=`This path is not shorter than the current path from ${h.label} to ${x.label} (${L} >= ${x.dist}).\n            When ${x.label} will be choosen as current node, it will extend path leading through its current predecessor (${j}), unless shorter path that could be extended by it will be constructed beforehand.`}s(t),t=new r.u,t.addChange(a.X.markElement(e,x.desc,"reject")),t.addChange(a.X.markElement(e,X.desc,"reject"))}),t.addChange(a.X.markElement(e,k.desc,"reject"))}t=new r.u,t.description="Set of available nodes is empty, but the path from source to destination was not found.\n      This should not be possible on a connected graph, with finite number of nodes and non-negative edge costs.\n      There is an error either in correctness checks of the algorithm or the implementation itself.",s(t)}(h,t,N,P,v)}}(_||(_={})),addEventListener("message",({data:e})=>{const{graphData:o,source:u,destination:s}=e,v=E.UndirectedGraph.from(o);_.aStar(v,u,s,h=>{postMessage(h)})})},6215:(i,f,n)=>{"use strict";n.d(f,{ap:()=>d,d4:()=>C,hj:()=>a,k3:()=>m});var $,E=n(5149),c=n(8610),r=n(1507);function a(g,A,l){return"edge"==A.type?g.getEdgeAttribute(A.key,l):g.getNodeAttribute(A.key,l)}function d(g,A,l){return"edge"==A.type?g.removeEdgeAttribute(A.key,l):g.removeNodeAttribute(A.key,l)}function m(g,A,l,p){"edge"==A.type?g.setEdgeAttribute(A.key,l,p):g.setNodeAttribute(A.key,l,p)}function C(g){const A=g.slice(0,1),l=g.slice(1);return A.toUpperCase()+l}!function(g){let A,l;(A=g.staticChecks||(g.staticChecks={})).isConnected=function w(y){const _=(0,E.dQ)(y);if(_.order==y.order)return{message:"",markings:[]};const S=[];return y.forEachNode(e=>{_.hasNode(e)||S.push(c.X.markElement(y,new r.B(e,"node"),"error"))}),{message:"A path between any pair of nodes in graph must exist",markings:S}},(l=g.dynamicChecks||(g.dynamicChecks={})).areAttributesInRange=function w(y,_,S,e){const{min:o,max:u}=e;if(void 0===o&&void 0===u)return{message:"",markings:[]};if(void 0!==o&&void 0!==u&&!(o<=u))throw new Error("areAttributesInRange in range GraphCheck is called improperly, conditions min <= max should be met");const s=[];"edge"==_?y.forEachEdge(h=>{const t=y.getEdgeAttribute(h,S);(void 0!==o&&o>t||void 0!==u&&u<t)&&s.push(c.X.markElement(y,new r.B(h,_),"error"))}):y.forEachNode(h=>{const t=y.getNodeAttribute(h,S);(void 0!==o&&o>t||void 0!==u&&u<t)&&s.push(c.X.markElement(y,new r.B(h,_),"error"))});let v="";return s.length>0&&(v=`Value of ${S} on each ${_} must be ${void 0!==o?`higher than or equal to ${o}`:""}${void 0!==o&&void 0!==u?" and ":""}${void 0!==u?`lower than or equal to ${u}`:""}.`),{message:v,markings:s}}}($||($={}))},3333:i=>{i.exports=function(n,E){var c=E.length;if(0!==c){var r=n.length;n.length+=c;for(var a=0;a<c;a++)n[r+a]=E[a]}}},4651:(i,f,n)=>{var c=n(6714),a=(n(7621),n(3333));function $(l,p,w){if(!c(p))throw new Error("graphology-shortest-path: invalid graphology instance.");if(!p.hasNode(w))throw new Error('graphology-shortest-path: the "'+w+'" source node does not exist in the given graph.');w=""+w;var y=new Set,_={},S=0;_[w]=0;for(var o,u,s,e=[w];0!==e.length;){var v=[];for(o=0,u=e.length;o<u;o++)!y.has(s=e[o])&&(y.add(s),a(v,p[l](s)),_[s]=S);S++,e=v}return _}var C=$.bind(null,"outboundNeighbors");$.bind(null,"neighbors");f.jZ=C},7621:(i,f,n)=>{var E=n(5701),c=n(4467);function r(){this.clear()}r.prototype.clear=function(){this.items=[],this.offset=0,this.size=0},r.prototype.enqueue=function(a){return this.items.push(a),++this.size},r.prototype.dequeue=function(){if(this.size){var a=this.items[this.offset];return 2*++this.offset>=this.items.length&&(this.items=this.items.slice(this.offset),this.offset=0),this.size--,a}},r.prototype.peek=function(){if(this.size)return this.items[this.offset]},r.prototype.forEach=function(a,d){d=arguments.length>1?d:this;for(var m=this.offset,$=0,C=this.items.length;m<C;m++,$++)a.call(d,this.items[m],$,this)},r.prototype.toArray=function(){return this.items.slice(this.offset)},r.prototype.values=function(){var a=this.items,d=this.offset;return new E(function(){if(d>=a.length)return{done:!0};var m=a[d];return d++,{value:m,done:!1}})},r.prototype.entries=function(){var a=this.items,d=this.offset,m=0;return new E(function(){if(d>=a.length)return{done:!0};var $=a[d];return d++,{value:[m++,$],done:!1}})},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.values),r.prototype.toString=function(){return this.toArray().join(",")},r.prototype.toJSON=function(){return this.toArray()},r.prototype.inspect=function(){var a=this.toArray();return Object.defineProperty(a,"constructor",{value:r,enumerable:!1}),a},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.from=function(a){var d=new r;return c(a,function(m){d.enqueue(m)}),d},r.of=function(){return r.from(arguments)},i.exports=r},4467:(i,f,n)=>{var E=n(8123),c=E.ARRAY_BUFFER_SUPPORT,r=E.SYMBOL_SUPPORT;i.exports=function(d,m){var $,C,g,A,l;if(!d)throw new Error("obliterator/forEach: invalid iterable.");if("function"!=typeof m)throw new Error("obliterator/forEach: expecting a callback.");if(Array.isArray(d)||c&&ArrayBuffer.isView(d)||"string"==typeof d||"[object Arguments]"===d.toString())for(g=0,A=d.length;g<A;g++)m(d[g],g);else if("function"!=typeof d.forEach)if(r&&Symbol.iterator in d&&"function"!=typeof d.next&&(d=d[Symbol.iterator]()),"function"!=typeof d.next)for(C in d)d.hasOwnProperty(C)&&m(d[C],C);else for($=d,g=0;!0!==(l=$.next()).done;)m(l.value,g),g++;else d.forEach(m)}},5701:i=>{function f(n){if("function"!=typeof n)throw new Error("obliterator/iterator: expecting a function!");this.next=n}typeof Symbol<"u"&&(f.prototype[Symbol.iterator]=function(){return this}),f.of=function(){var n=arguments,E=n.length,c=0;return new f(function(){return c>=E?{done:!0}:{done:!1,value:n[c++]}})},f.empty=function(){return new f(function(){return{done:!0}})},f.fromSequence=function(n){var E=0,c=n.length;return new f(function(){return E>=c?{done:!0}:{done:!1,value:n[E++]}})},f.is=function(n){return n instanceof f||"object"==typeof n&&null!==n&&"function"==typeof n.next},i.exports=f},8123:(i,f)=>{f.ARRAY_BUFFER_SUPPORT=typeof ArrayBuffer<"u",f.SYMBOL_SUPPORT=typeof Symbol<"u"}},T={};function b(i){var f=T[i];if(void 0!==f)return f.exports;var n=T[i]={exports:{}};return D[i].call(n.exports,n,n.exports,b),n.exports}b.m=D,b.x=()=>{var i=b.O(void 0,[681],()=>b(9280));return b.O(i)},i=[],b.O=(f,n,E,c)=>{if(!n){var a=1/0;for(r=0;r<i.length;r++){for(var[n,E,c]=i[r],d=!0,m=0;m<n.length;m++)(!1&c||a>=c)&&Object.keys(b.O).every(p=>b.O[p](n[m]))?n.splice(m--,1):(d=!1,c<a&&(a=c));if(d){i.splice(r--,1);var $=E();void 0!==$&&(f=$)}}return f}c=c||0;for(var r=i.length;r>0&&i[r-1][2]>c;r--)i[r]=i[r-1];i[r]=[n,E,c]},b.d=(i,f)=>{for(var n in f)b.o(f,n)&&!b.o(i,n)&&Object.defineProperty(i,n,{enumerable:!0,get:f[n]})},b.f={},b.e=i=>Promise.all(Object.keys(b.f).reduce((f,n)=>(b.f[n](i,f),f),[])),b.u=i=>i+".59d8dad51cac7c68.js",b.miniCssF=i=>{},b.o=(i,f)=>Object.prototype.hasOwnProperty.call(i,f),(()=>{var i;b.tt=()=>(void 0===i&&(i={createScriptURL:f=>f},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(i=trustedTypes.createPolicy("angular#bundler",i))),i)})(),b.tu=i=>b.tt().createScriptURL(i),b.p="",(()=>{var i={280:1};b.f.i=(c,r)=>{i[c]||importScripts(b.tu(b.p+b.u(c)))};var n=self.webpackChunkShortPath=self.webpackChunkShortPath||[],E=n.push.bind(n);n.push=c=>{var[r,a,d]=c;for(var m in a)b.o(a,m)&&(b.m[m]=a[m]);for(d&&d(b);r.length;)i[r.pop()]=1;E(c)}})(),(()=>{var i=b.x;b.x=()=>b.e(681).then(i)})(),b.x()})();