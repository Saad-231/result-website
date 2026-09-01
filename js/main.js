/* =========================================================
   main.js — shared front-end behaviour
   No result data is fetched, stored or displayed here.
   The only job of the search form is to route the student
   to the correct official Board website.
   ========================================================= */

(function () {
  "use strict";

  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const header = document.querySelector(".site-header");
    if (!toggle || !header) return;
    toggle.addEventListener("click", function () {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function setFieldError(field, message) {
    const wrap = field.closest(".field");
    if (!wrap) return;
    let err = wrap.querySelector(".field-error");
    if (message) {
      wrap.classList.add("has-error");
      if (err) err.textContent = message;
    } else {
      wrap.classList.remove("has-error");
    }
  }

  function initResultForm() {
    const form = document.querySelector("[data-result-form]");
    if (!form) return;

    const classField = form.querySelector("[name='class']");
    const boardField = form.querySelector("[name='board']");
    const rollField = form.querySelector("[name='roll']");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      if (classField && !classField.value) {
        setFieldError(classField, "Please select your class.");
        valid = false;
      } else if (classField) {
        setFieldError(classField, "");
      }

      if (boardField && !boardField.value) {
        setFieldError(boardField, "Please select your Board.");
        valid = false;
      } else if (boardField) {
        setFieldError(boardField, "");
      }

      if (rollField && rollField.value.trim().length < 3) {
        setFieldError(rollField, "Enter a valid roll number.");
        valid = false;
      } else if (rollField) {
        setFieldError(rollField, "");
      }

      if (!valid) return;

      const boardKey = boardField.value;
      const board = BOARDS[boardKey];

      if (!board) {
        setFieldError(boardField, "This Board is not available yet.");
        return;
      }

      /* We deliberately do NOT pass the roll number to the
         official site as a query parameter: most Board sites
         use their own POST-based search forms, so a guessed
         query string would be misleading. We hand the student
         off to the Board's own result page and let them enter
         it there. Roll numbers are never stored by this site. */
      window.open(board.resultUrl, "_blank", "noopener");
    });
  }

  function initStatusStrips() {
    document.querySelectorAll("[data-status-for]").forEach(function (el) {
      const classKey = el.getAttribute("data-status-for");
      const cycle = resolveClassCycle(classKey);
      if (!cycle) return;

      el.setAttribute("data-status", cycle.status);
      const label = STATUS_LABEL[cycle.status] || "";

      el.textContent = "";
      const dot = document.createElement("span");
      dot.className = "status-dot";
      el.appendChild(dot);

      if (cycle.status === "announced") {
        el.appendChild(document.createTextNode(label + " \u2014 " + cycle.year));
      } else if (cycle.status === "upcoming") {
        el.appendChild(document.createTextNode(label + " " + cycle.dateText));
      } else {
        el.appendChild(document.createTextNode(label + " (" + cycle.year + ")"));
      }
    });
  }

  /* Pre-select a class or board on pages dedicated to one,
     e.g. /10th-class-result or /lahore-board-result, and
     lock that field so the student only has to fill the rest. */
  function initPreselect() {
    const form = document.querySelector("[data-result-form]");
    if (!form) return;

    const presetClass = form.getAttribute("data-preset-class");
    const presetBoard = form.getAttribute("data-preset-board");

    if (presetClass) {
      const f = form.querySelector("[name='class']");
      if (f) f.value = presetClass;
    }
    if (presetBoard) {
      const f = form.querySelector("[name='board']");
      if (f) f.value = presetBoard;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initPreselect();
    initResultForm();
    initStatusStrips();
  });
})();
