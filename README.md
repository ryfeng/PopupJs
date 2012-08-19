PopupJs - Popup Manager for JavaScript
======================================
Author: Royce Feng

Options:
--------

 - `nPosition`: one of 17 possible positions in window.PopupPosition
 - `oElAxis`: element to be the axis of positioning
 - `xOffset` (positive moves object to the RIGHT, negative moves to the LEFT)
 - `yOffset` (position moves object DOWN, negative moves object UP)
 - `allowDrag`: allows popup to be dragged
 - `draghandle`: jQuery selector for drag handle
 - `oElParent`: closest parent that whose position is not static
 - `findParent`: finds the closest parent that is not statically positioned and offsets
 - `fHideOthersOnShow`: hides other popup windows when shown
 
Important
---------

 - Popups are overwritten with absolute position. I do not currently support relatively positioned popups.
 - Uses `$(window).resize` to reposition popups. I would highly suggest not unbinding.
 - Uses `$(document).click` to hide/show popups when clicked outside. I would highly suggest not unbinding.
     - Stopping propagation any place in the document will cause this to fail.

MIT License
Copyright (c) 2012 Royce Feng

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.