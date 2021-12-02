export const HTML_NO_DATA = `<span class="no-data">no data</span>`

export function splitIntoLines(input: string, len: number) {
  var i;
  var output = [];
  var lineSoFar = "";
  var temp;
  var words = input.split(' ');
  for (i = 0; i < words.length;) {
    temp = addWordOntoLine(lineSoFar, words[i]);
    if (temp.length > len) {
      if (lineSoFar.length == 0) {
        lineSoFar = temp;
        i++;
      }
      output.push(lineSoFar);
      lineSoFar = ""
    } else {
      lineSoFar = temp;
      i++;
    }
  }
  if (lineSoFar.length > 0) {
    output.push(lineSoFar);
  }
  return(output);
}

export function addWordOntoLine(line: string, word: string) {
  if (line.length != 0) {
    line += " ";
  }
  return (line += word);
}

export function extractHTMLContent(text: string) {
  var span = document.createElement('span');
  span.innerHTML = text;
  return span.textContent || span.innerText;
};