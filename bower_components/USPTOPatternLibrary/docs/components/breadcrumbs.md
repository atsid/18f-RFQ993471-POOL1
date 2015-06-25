---
title: "Breadcrumbs"
---

<div class="pl-pattern">
<h3>Breadcrumbs</h3>

#### Purpose
Users need to understand their current location and navigate within a hierarchical navigation scheme.

#### Description
Breadcrumbs display the current path to a particular page relative to the starting point. Breadcrumbs provide a means for users to understand their current context in a hierarchical structure and the ability to navigate up the structure easily.

- Breadcrumbs display the current path as links separated by carets to indicate each level.
- The navigation root is the first element, the current location is the last element
- The current location is not clickable.
- Clicking on a link takes you to that screen. 

Depending on the complexity of the navigational hierarchy and the type of page or application, it may make sense for the breadcrumb to represent only part of the hierarchy while sub tabs/trees/navigation represent the remaining hierarchy. In that case, you may want to make the far right element clickable.

{::nomarkdown}
<div class="pl-preview">
<ol class="breadcrumb">
  <li class="active">Home</li>
</ol>
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li class="active">Library</li>
</ol>
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Library</a></li>
  <li class="active">Data</li>
</ol>
</div>
{:/nomarkdown}

{% highlight html %}
<ol class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Library</a></li>
  <li class="active">Data</li>
</ol>
{% endhighlight %}
</div>
