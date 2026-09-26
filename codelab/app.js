const steps=window.SQL_STEPS;
const $=id=>document.getElementById(id);
let current=Number(localStorage.getItem("sql-current")||0);
let completed=new Set(JSON.parse(localStorage.getItem("sql-completed")||"[]"));
let db=null, SQL=null;

const seed=`
CREATE TABLE departments(department_id INTEGER PRIMARY KEY,department_name TEXT);
CREATE TABLE employees(employee_id INTEGER PRIMARY KEY,first_name TEXT,last_name TEXT,department_id INTEGER,salary INTEGER,active INTEGER);
CREATE TABLE customers(customer_id INTEGER PRIMARY KEY,customer_name TEXT,country TEXT);
CREATE TABLE orders(order_id INTEGER PRIMARY KEY,customer_id INTEGER,order_date TEXT,amount REAL,status TEXT);
INSERT INTO departments VALUES (1,'Product'),(2,'Data'),(3,'Operations'),(4,'Marketing');
INSERT INTO employees VALUES
(1,'Ada','Lovelace',2,98000,1),(2,'Guido','Rossum',2,92000,1),(3,'Grace','Hopper',2,105000,1),(4,'Linus','Torvalds',1,88000,1),
(5,'Margaret','Hamilton',1,96000,1),(6,'Tim','Berners-Lee',4,72000,1),(7,'Barbara','Liskov',3,84000,1),(8,'Donald','Knuth',3,84000,0);
INSERT INTO customers VALUES (1,'Northstar GmbH','Germany'),(2,'Tulip Labs','Netherlands'),(3,'Atlas SAS','France'),(4,'Nordic AB','Sweden');
INSERT INTO orders VALUES (101,1,'2026-01-10',1200,'paid'),(102,1,'2026-02-03',850,'paid'),(103,2,'2026-02-17',1500,'paid'),(104,2,'2026-03-02',300,'cancelled'),(105,3,'2026-03-11',2300,'paid'),(106,4,'2026-03-22',700,'paid'),(107,4,'2026-04-05',950,'paid');`;

async function boot(){
  try{
    SQL=await initSqlJs({locateFile:f=>"https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/"+f});
    resetDb();
    $("runtimeDot").className="runtime-dot ready"; $("runtimeText").textContent="SQL runtime ready";
    render();
  }catch(e){
    $("runtimeDot").className="runtime-dot error"; $("runtimeText").textContent="SQL runtime failed to load";
    $("queryOutput").innerHTML='<div class="error-text">'+escapeHtml(String(e))+'</div>';
  }
}
function resetDb(){db=new SQL.Database();db.run(seed)}
function execute(sql){
  resetDb();
  const res=db.exec(sql);
  if(!res.length)return {columns:[],values:[]};
  return res[res.length-1];
}
function normalize(result){
  return JSON.stringify({
    columns:result.columns.map(x=>String(x).toLowerCase()),
    values:result.values.map(row=>row.map(v=>v===null?null:(typeof v==="number"?Math.round(v*1e8)/1e8:String(v))))
  });
}
function renderTable(result){
  if(!result.columns.length)return "<p>Query executed successfully. No result set returned.</p>";
  const h="<tr>"+result.columns.map(c=>"<th>"+escapeHtml(c)+"</th>").join("")+"</tr>";
  const b=result.values.map(r=>"<tr>"+r.map(v=>"<td>"+escapeHtml(v===null?"NULL":String(v))+"</td>").join("")+"</tr>").join("");
  return "<table><thead>"+h+"</thead><tbody>"+b+"</tbody></table>";
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function save(){localStorage.setItem("sql-current",current);localStorage.setItem("sql-completed",JSON.stringify([...completed]))}
function renderNav(){
  $("stepNav").innerHTML=steps.map((s,i)=>`<button class="step-link ${i===current?"active":""} ${completed.has(i)?"complete":""}" data-i="${i}"><span class="step-index">${completed.has(i)?"✓":i+1}</span><span class="step-title">${s.title}</span></button>`).join("");
  document.querySelectorAll(".step-link").forEach(b=>b.onclick=()=>{current=Number(b.dataset.i);save();render()});
}
function render(){
  const s=steps[current]; renderNav();
  $("stepNumber").textContent=`Step ${current+1} of ${steps.length}`;
  $("modePill").textContent=s.executable===false?"MySQL / Concept":"Interactive SQL";
  $("lessonTitle").textContent=s.title; $("lessonIntro").textContent=s.intro;
  $("learnBullets").innerHTML=s.learn.map(x=>"<li>"+escapeHtml(x)+"</li>").join("");
  $("exampleCode").textContent=s.example; $("challengeText").textContent=s.challenge;
  $("starterCode").value=s.starter; $("solutionCode").textContent=s.solution; $("takeawayText").textContent=s.takeaway;
  $("solutionPanel").hidden=true; $("checkFeedback").hidden=true;
  $("queryOutput").textContent=s.executable===false?"This step is conceptual. Practice it in MySQL Workbench.":"Ready.";
  const usable=!!db && s.executable!==false; $("runSql").disabled=!usable; $("checkAnswer").disabled=!usable;
  $("completeButton").textContent=completed.has(current)?"✓ Complete":"Mark step complete";
  $("prevButton").disabled=current===0; $("nextButton").disabled=current===steps.length-1;
  $("progressText").textContent=`${completed.size} of ${steps.length} complete`;
  $("progressBar").style.width=`${completed.size/steps.length*100}%`;
}
$("runSql").onclick=()=>{try{const r=execute($("starterCode").value);$("queryOutput").innerHTML=renderTable(r)}catch(e){$("queryOutput").innerHTML='<div class="error-text">'+escapeHtml(String(e))+'</div>'}};
$("checkAnswer").onclick=()=>{const fb=$("checkFeedback");fb.hidden=false;try{const a=execute($("starterCode").value), b=execute(steps[current].solution);if(normalize(a)===normalize(b)){fb.className="check-feedback good";fb.textContent="Correct — the result matches.";completed.add(current);save();renderNav();$("progressText").textContent=`${completed.size} of ${steps.length} complete`;$("progressBar").style.width=`${completed.size/steps.length*100}%`; $("completeButton").textContent="✓ Complete"}else{fb.className="check-feedback";fb.textContent="Not yet — your query runs, but the result does not match the target."}}catch(e){fb.className="check-feedback";fb.textContent="Fix the SQL error first: "+e.message}};
$("resetCode").onclick=()=>{$("starterCode").value=steps[current].starter};
$("solutionButton").onclick=()=>{$("solutionPanel").hidden=!$("solutionPanel").hidden};
$("clearOutput").onclick=()=>{$("queryOutput").textContent="Ready.";$("checkFeedback").hidden=true};
$("prevButton").onclick=()=>{if(current>0){current--;save();render()}};
$("nextButton").onclick=()=>{if(current<steps.length-1){current++;save();render()}};
$("completeButton").onclick=()=>{completed.has(current)?completed.delete(current):completed.add(current);save();render()};
$("resetProgress").onclick=()=>{completed.clear();current=0;save();render()};
$("themeButton").onclick=()=>{const dark=document.documentElement.dataset.theme==="dark";document.documentElement.dataset.theme=dark?"light":"dark";localStorage.setItem("sql-theme",dark?"light":"dark")};
$("menuButton").onclick=()=>{$("sidebar").classList.toggle("open")};
document.querySelectorAll(".copy-button").forEach(b=>b.onclick=()=>navigator.clipboard.writeText($(b.dataset.copy).textContent));
document.documentElement.dataset.theme=localStorage.getItem("sql-theme")||"light";
render();boot();