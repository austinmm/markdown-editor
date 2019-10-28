# GitHub Flavored Markdown (GFM)
## Task List Documentation
GFM enables the ability for tasklist, which is considered an extension feature. This is because an additional processing step is performed on list items to be able to render tasklist items.

### How Tasklist Items Work
A task list item is a list item where the first block in it is a paragraph which begins with a task list item marker and at least one whitespace character before any other content.

A task list item marker consists of an optional number of spaces, a left bracket ([), either a whitespace character or the letter x in either lowercase or uppercase, and then a right bracket (]).

When rendered, the task list item marker is replaced with a semantic checkbox element; in an HTML output, this would be an <input type="checkbox"> element.

If the character between the brackets is a whitespace character, the checkbox is unchecked. Otherwise, the checkbox is checked.

- **Here is the code implemented by @austinmm that enabled this ability:**
```
var render_tasklist = function(str){
  // Checked task-list box match
	if(str.match(/<li>\[x\]\s+\w+/gi)){
        str = str.replace(/(<li)(>\[x\]\s+)(\w+)/gi, 
          `$1 style="list-style-type: none;"><input type="checkbox" 
          checked style="list-style-type: none; 
          margin: 0 0.2em 0 -1.3em;" disabled> $3`);
    }
    // Unchecked task-list box match
    if (str.match(/<li>\[ \]\s+\w+/gi)){
        str = str.replace(/(<li)(>\[ \]\s+)(\w+)/gi, 
          `$1 style="list-style-type: none;"><input type="checkbox" 
            style="list-style-type: none; 
            margin: 0 0.2em 0 -1.3em;" disabled> $3`);
    }
    return str
}
```
### 1.) Checked Task-List Item
- Input:
```
- [x] foo
```
- Output:
```
<ul>
<li><input checked disabled type="checkbox"> foo</li>
</ul>
```

### 2.) Unchecked Task-List Item
- Input:
```
- [ ] foo
```
- Output:
```
<ul>
<li><input disabled type="checkbox"> foo</li>
</ul>
```

### 3.) Checked and Unchecked Task-List Items
- Input:
```
- [ ] foo
- [x] bar
```
- Output:
```
<ul>
<li><input disabled type="checkbox"> foo</li>
<li><input checked disabled type="checkbox"> bar</li>
</ul>
```

### 4.) Nested Task-List Items
- Input:
```
- [x] foo
  - [ ] bar
  - [x] baz
- [ ] bim
```
- Output:
```
<ul>
<li><input checked disabled type="checkbox"> foo
<ul>
<li><input disabled type="checkbox"> bar</li>
<li><input checked disabled type="checkbox"> baz</li>
</ul>
</li>
<li><input disabled type="checkbox"> bim</li>
</ul>
```
