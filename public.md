---
title = "P u b l i c"
display_in_sessions = false
display_date = false
---

<h2></h2>
<!--input type="password" id="i">
<button type="button" id="b" onclick="dec()">Dec</button-->

<ul id="f">
  <li><a id="file1" href="/static/enc/040c4703190e">040c4703190e</a></li>
</ul>


<script>
const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)).map(applySaltToChar).map((charCode) => String.fromCharCode(charCode)).join("");
};

const input = document.getElementById('i');
input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    dec(input);
  }
});

function dec(input) {
  if (typeof input === 'undefined') {
    input = document.getElementById('i');
  }
  const salt = input.value || input;
  if (salt === null || typeof salt === 'undefined' || salt.length === 0) {
    return;
  }

  const anchors = document.querySelectorAll('#f>li>a');
  anchors.forEach((a) => {
    a.innerHTML = decrypt(salt, a.innerHTML);
  });

};
</script>

