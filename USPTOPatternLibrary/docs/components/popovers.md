---
title: "Popovers"
---

<div class="pl-pattern">
<h3>Popovers</h3>

#### Purpose
Users need to be able to access additional related information or functionality without a change in context.

#### Description
- Popovers are a cross between a dialog and a tooltip
- Popovers are smaller contextual dialogs that are generally triggered by a click
- They may or may not provide additional interactive controls
- Popovers display information or functionality related to a particular item or control
- Popovers can be dismissed via a close icon, clicking the control that opened it, or by clicking anywhere outside of the popover
- The amount of content in a popover should be relatively short, but they can be scrollable if necessary
- Popovers should be positioned based on the screen space available, 

Use a popover instead of a tooltip or dialog when:

- You want a contextual relationship that a dialog can't provide
- You need to provide relatively simple interactions
- You have more text/content than can comfortably fit in a tooltip

{::nomarkdown}
<div class="pl-preview">
<div class="popover left" style="position: relative; display: block; margin-left: 0;">
  <div class="arrow"></div>
  <h3 class="popover-title">Add note</h3>
  <div class="popover-content">
    <textarea placeholder="Enter note here" class="form-control" name="" id="" rows="3"></textarea>
  </div>
  <div class="popover-toolbar">
        <button class="btn btn-hover btn-icon-only"><i class="icon icon-image"></i><span class="sr-only">Add image</span></button>
        <button class="btn btn-hover btn-icon-only"><i class="icon icon-chain"></i><span class="sr-only">Add link</span></button>
        <button class="btn btn-primary pull-right">Add</button>
  </div>
</div>
<div class="popover right" style="position: relative; display: block; margin-left: 0; margin-top: 20px;">
  <div class="arrow"></div>
  <div class="popover-content">
    <p>Simple search: Type a term in the search field and select the search button.</p>
    <p>Advanced  search: Advanced boolean operators may be used. The default operator when searching multiple terms is “AND”.</p>
    <a href="">Learn more</a>
  </div>
</div>

<hr/>

<button class="btn btn-default" data-html="true" data-toggle="popover" data-container="body" data-trigger="focus" data-content="<p>Simple search: Type a term in the search field and select the search button.</p>
    <p>Advanced  search: Advanced boolean operators may be used. The default operator when searching multiple terms is “AND”.</p> <a href=''>Learn more</a>">Show popover</button>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="popover left">
    <div class="arrow"></div>
    <h3 class="popover-title">Add note</h3>
    <div class="popover-content">
        <textarea placeholder="Enter note here" class="form-control" name="" id="" rows="3"></textarea>
    </div>
    <div class="popover-toolbar">
        <button class="btn btn-hover btn-icon-only"><i class="icon icon-image"></i><span class="sr-only">Add image</span></button>
        <button class="btn btn-hover btn-icon-only"><i class="icon icon-chain"></i><span class="sr-only">Add link</span></button>
        <button class="btn btn-primary pull-right">Add</button>
    </div>
</div>
{% endhighlight %}

</div>
