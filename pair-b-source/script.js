// the photos (IMG) are loaded from images.js

// ---------- data (replace with our real campus info) ----------
const kanji = { Technical: "技", Cultural: "芸", Sports: "闘", Social: "絆" };

const clubs = [
  { name: "Coding Club", cat: "Technical", about: "Build nights and hackathon prep.", join: "Fill the form at the B1 notice board." },
  { name: "Robotix", cat: "Technical", about: "Robots, drones and IoT.", join: "Short interview, bring a project idea." },
  { name: "Dance Society", cat: "Cultural", about: "Stage shows and fest acts.", join: "Auditions on the first Saturday." },
  { name: "Drama Circle", cat: "Cultural", about: "Street plays and stage shows.", join: "Open to all." },
  { name: "Football League", cat: "Sports", about: "Inter-block tournaments.", join: "Register a team of 7 at the sports office." },
  { name: "Fitness Crew", cat: "Sports", about: "Group training and challenges.", join: "Gym card required." },
  { name: "Debate Union", cat: "Social", about: "Public speaking and MUN.", join: "Open to all, first meeting is a trial." },
  { name: "Volunteer Squad", cat: "Social", about: "Cleanups and community drives.", join: "Sign up on the day." }
];

// first one is real (photographed on campus), the rest are still sample data
const events = [
  { title: "CEO Under Fire · CXOs Summit", day: "30", month: "Sep", place: "University School of Business", club: "School of Business", img: "ceo-poster" },
  { title: "Hack the Night", day: "02", month: "Oct", place: "B1 Seminar Hall", club: "Coding Club" },
  { title: "Robotics Workshop", day: "03", month: "Oct", place: "Lab Block 4", club: "Robotix" },
  { title: "Inter-Block Football", day: "04", month: "Oct", place: "Main Ground", club: "Football League" }
];

// our campus photos: what we saw, and which feature it led to
const campus = [
  { img: "ceo", title: "CEO Under Fire poster", saw: "Summit poster on a standee by the road. Easy to walk past.", built: "Events timeline with add to calendar" },
  { img: "jam", title: "JAM 3.0 session", saw: "Event details only on banners inside the hall.", built: "One place to find every event" },
  { img: "hangar", title: "Aerospace workshop hangar", saw: "Hands-on lab where students build projects.", built: "Technical clubs and workshops" },
  { img: "forensic", title: "Forensic Science classroom, Mohali", saw: "Department sessions run in classrooms.", built: "Interest quiz and club matrix" },
  { img: "track", title: "Athletics track and ground", saw: "Open track and football ground with no booking info.", built: "Sports slot booking and matchmaker" }
];

const tips = [
  { text: "Join one technical and one non-technical club in your first month.", by: "Senior, 3rd year CSE" },
  { text: "Book gym slots in the early evening. Mornings are less crowded.", by: "Senior, 4th year ECE" },
  { text: "Go to the club fair on day one. Most auditions are announced there.", by: "Senior, 2nd year BBA" }
];

// each answer gives one point to a category
const questions = [
  { q: "How do you want to spend a free evening?", a: [["Building something on my laptop", "Technical"], ["On stage or making art", "Cultural"], ["On a court or ground", "Sports"], ["Talking with a big group", "Social"]] },
  { q: "Pick a weekend plan.", a: [["A hackathon", "Technical"], ["A fest performance", "Cultural"], ["Match day", "Sports"], ["A volunteering drive", "Social"]] },
  { q: "What are you best at?", a: [["Solving problems", "Technical"], ["Creating and performing", "Cultural"], ["Staying active", "Sports"], ["Leading and connecting", "Social"]] },
  { q: "What do you want from a club?", a: [["New skills", "Technical"], ["A place to express myself", "Cultural"], ["Fitness and teamwork", "Sports"], ["New friends", "Social"]] }
];

const times = ["6:00 AM", "7:00 AM", "5:00 PM", "6:00 PM", "7:00 PM"];
const taken = { "Gym": ["6:00 AM", "6:00 PM"], "Football Ground": ["5:00 PM"], "Badminton Court": ["7:00 PM"] };

const facilityPhoto = { "Football Ground": "track" };

let step = 0, scores = {};
let facility = "Gym", chosen = "", booked = [];
let posts = [{ text: "Need 2 players for football", time: "Sat, 5 PM", by: "Aman" }];

const $ = id => document.getElementById(id);

// ---------- switching pages ----------
function show(page) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  $(page).classList.add("active");
}

// ---------- quiz ----------
function showQuestion() {
  const q = questions[step];
  $("quiz-box").innerHTML =
    `<div class="bar"><div style="width:${step / questions.length * 100}%"></div></div>
     <p class="muted">Question ${step + 1} of ${questions.length}</p>
     <h2>${q.q}</h2>` +
    q.a.map(a => `<button class="option" onclick="answer('${a[1]}')">${a[0]}</button>`).join("");
}

function answer(cat) {
  scores[cat] = (scores[cat] || 0) + 1;
  step++;
  step < questions.length ? showQuestion() : showResult();
}

function showResult() {
  // category with the most points wins
  const best = Object.keys(scores).sort((a, b) => scores[b] - scores[a])[0];
  $("quiz-box").innerHTML =
    `<div class="result"><div class="seal">${kanji[best]}</div>
     <div><p class="muted">Your technique</p><h1><em>${best}</em> path</h1></div></div>
     <div class="grid">${clubs.filter(c => c.cat === best).map(clubCard).join("")}</div>
     <button class="btn" onclick="step = 0; scores = {}; showQuestion()">Retake quiz</button>`;
}

// ---------- clubs ----------
function clubCard(c) {
  return `<div class="card glass ${c.cat}">
    <span class="kanji">${kanji[c.cat]}</span>
    <span class="tag">${c.cat}</span>
    <h3>${c.name}</h3>
    <div class="muted">${c.about}</div>
    <div class="join">${c.join}</div>
  </div>`;
}

function showClubs(filter = "All") {
  $("club-filters").innerHTML = ["All", ...Object.keys(kanji)]
    .map(c => `<button class="chip ${c === filter ? "on" : ""}" onclick="showClubs('${c}')">${c}</button>`).join("");
  $("club-list").innerHTML = clubs
    .filter(c => filter === "All" || c.cat === filter)
    .map(clubCard).join("");
}

// ---------- events ----------
function showEvents() {
  $("event-list").innerHTML = events.map(e => `
    <div class="event glass">
      <div class="row">
        ${e.img ? `<img class="thumb" src="${IMG[e.img]}" alt="${e.title} poster">` : ""}
        <div class="date">${e.day}<small>${e.month}</small></div>
        <div><b>${e.title}</b><div class="muted">${e.club} · ${e.place}</div></div>
      </div>
      <button class="btn" onclick="this.textContent = 'Added ✔'; this.classList.add('done')">Add to calendar</button>
    </div>`).join("");
}

// ---------- sports ----------
function showSports() {
  $("facility-buttons").innerHTML = Object.keys(taken)
    .map(f => `<button class="chip ${f === facility ? "on" : ""}" onclick="facility = '${f}'; chosen = ''; showSports()">${f}</button>`).join("");

  $("facility-photo").innerHTML = facilityPhoto[facility]
    ? `<img class="fphoto" src="${IMG[facilityPhoto[facility]]}" alt="${facility}">` : "";

  $("slot-list").innerHTML = times.map(t => {
    const full = taken[facility].includes(t) || booked.includes(facility + t);
    return `<button class="slot ${t === chosen ? "on" : ""}" ${full ? "disabled" : ""} onclick="chosen = '${t}'; showSports()">${t}</button>`;
  }).join("");

  $("post-list").innerHTML = posts.map(p =>
    `<div class="post"><div><b>${p.text}</b><div class="muted">${p.time} · ${p.by}</div></div></div>`).join("");
}

function bookSlot() {
  if (!chosen) { $("book-msg").textContent = "Pick a time slot first."; return; }
  booked.push(facility + chosen);
  const t = chosen;
  chosen = "";
  showSports();
  $("book-msg").textContent = `Booked ${facility} at ${t}. Show your UID at the gate.`;
}

function addPost() {
  const text = $("post-text").value.trim();
  const time = $("post-time").value.trim();
  if (!text || !time) return;
  posts.unshift({ text, time, by: "You" });
  showSports();
}

// ---------- tips ----------
function showTips() {
  $("tip-list").innerHTML = tips.map(t =>
    `<div class="glass tip"><p>${t.text}</p><div class="muted">${t.by}</div></div>`).join("");
}

// ---------- campus photos ----------
function showCampus() {
  $("campus-list").innerHTML = campus.map(p => `
    <div class="card glass photo">
      <img src="${IMG[p.img]}" alt="${p.title}">
      <div class="info">
        <h3>${p.title}</h3>
        <div class="muted">We saw: ${p.saw}</div>
        <div class="built">So we built: ${p.built}</div>
      </div>
    </div>`).join("");
}

// run everything once when the page loads
function start() {
  showQuestion();
  showClubs();
  showEvents();
  showSports();
  showTips();
  showCampus();
}

start();
