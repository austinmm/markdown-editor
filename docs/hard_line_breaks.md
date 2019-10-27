# GitHub Flavored Markdown (GFM)
## Hard Line Breaks Documentation
Hard Line breaks can be implamented in a variety of ways in the GFM format.  
Below is a complete list of all ways in which one can go about implamenting a hard line break.

#### 1.) A line break (not in a code span or HTML tag) that is preceded by two or more spaces and does not occur at the end of a block is parsed as a hard line break (rendered in HTML as a <br /> tag):
  - Input...
```
foo{spacex2}
baz
```
  - Output...
```
<p>foo<br />
baz</p>
```

#### 2.) For a more visible alternative, a backslash before the line ending may be used instead of two spaces:
  - Input...
```
foo\
baz
```
  - Output...
```
<p>foo<br />
baz</p>
```

#### 3.) More than two spaces can be used:
  - Input...
```
foo{spacex4}
baz
```
- Output...
```
<p>foo<br />
baz</p>
```

#### 4.) Leading spaces at the beginning of the next line are ignored:
  - Input...
```
foo{spacex2}
     bar
 ```
  - Output...
```
<p>foo<br />
bar</p>
```

#### 5.) Leading spaces at the beginning of the next line are ignored:
  - Input:
```
foo\
     bar
```
  - Output...
```
<p>foo<br />
bar</p>
```
#### 6.) Line containg only a backslash inbetween: 
  - Input:
```
foo
\
bar
```
  - Output...
```
<p>foo
<br /><br />
bar</p>
```
