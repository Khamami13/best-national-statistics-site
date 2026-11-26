// main.js — hash router for the site. Routes (all local, no network):
//
//   #/                  Overview
//   #/population        Population (line chart)
//   #/population/bars   Population (bar chart)
//   #/economy           Economy
//   #/employment        Employment
//   #/health            Health
//   #/education         Education
//   #/provinces         Provinces (searchable, sortable table)
//   #/sources           Sources & method
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import {
  NAV, overview, populationPage, economyPage, employmentPage,
  healthPage, educationPage, provincesPage, sourcesPage, missing,
} from "./views.js";
import { PROVINCES } from "./data.js";

const app = document.getElementById("app");
const navEl = document.getElementById("nav");

navEl.innerHTML = NAV.map((n) => `<a href="${n.route}" data-route="${n.route}">${n.label}</a>`).join("");

function markActive(route) {
  navEl.querySelectorAll("a").forEach((a) => {
    const base = a.getAttribute("data-route");
    const on = route === base || (base !== "#/" && route.startsWith(base));
    a.classList.toggle("active", on);
    if (on) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

// Live province filter: typing in the search box or changing the sort
// re-renders just the table, without leaving the page.
function wireProvinces() {
  const form = document.getElementById("provFilter");
  if (!form) return;
  const queryInput = document.getElementById("provQuery");
  const sortSelect = document.getElementById("provSort");
  const apply = () => {
    const q = queryInput.value.trim().toLowerCase();
    const sortKey = sortSelect.value;
    let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
    rows = [...rows].sort((a, b) => (sortKey === "density" ? b.density - a.density : sortKey === "name" ? a.name.localeCompare(b.name) : b.pop - a.pop));
    const tbody = document.querySelector("#provFilter").parentElement.querySelector("tbody");
    const count = document.getElementById("provCount");
    tbody.innerHTML = rows.length
      ? rows.map((p, i) => `<tr><td>${i + 1}</td><td><strong>${p.name}</strong><br><span class="muted">${p.id}</span></td><td>${p.capital}</td><td>${p.island}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.density.toLocaleString("en-US")}</td></tr>`).join("")
      : `<tr><td colspan="6">No province matches that search. <a href="#/provinces">Show all provinces</a>.</td></tr>`;
    count.textContent = `${rows.length} province${rows.length === 1 ? "" : "s"} shown${q ? ` matching “${queryInput.value.trim()}”` : ""}.`;
  };
  queryInput.addEventListener("input", apply);
  sortSelect.addEventListener("change", apply);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    apply();
  });
}

function wirePrint() {
  const btn = document.getElementById("printBtn");
  if (btn) btn.addEventListener("click", () => window.print());
}

const TITLES = {
  "#/": "Indonesia in Figures — Nusantara Numbers",
  "#/population": "Population — Indonesia in Figures",
  "#/economy": "Economy — Indonesia in Figures",
  "#/employment": "Employment — Indonesia in Figures",
  "#/health": "Health — Indonesia in Figures",
  "#/education": "Education — Indonesia in Figures",
  "#/provinces": "Provinces — Indonesia in Figures",
  "#/sources": "Sources — Indonesia in Figures",
};

function render() {
  window.__shotReady = false;
  const hash = location.hash || "#/";
  const route = hash.split("?")[0];
  let html;
  if (route === "#/" || route === "#") html = overview();
  else if (route === "#/population") html = populationPage("line");
  else if (route === "#/population/bars") html = populationPage("bars");
  else if (route === "#/economy") html = economyPage();
  else if (route === "#/employment") html = employmentPage();
  else if (route === "#/health") html = healthPage();
  else if (route === "#/education") html = educationPage();
  else if (route === "#/provinces") html = provincesPage("", "pop");
  else if (route === "#/sources") html = sourcesPage();
  else html = missing();
  document.title = TITLES[route] || "Page not found — Indonesia in Figures";
  app.innerHTML = html;
  markActive(route === "#/population/bars" ? "#/population" : route);
  wireProvinces();
  wirePrint();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", render);
render();
