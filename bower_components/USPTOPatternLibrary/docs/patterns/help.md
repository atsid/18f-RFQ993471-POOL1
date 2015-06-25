---
title: "Help"
---

<div class="pl-pattern">
<h3>Help</h3>

#### Purpose
Users need to understand the processes, forms, and data they're interacting with.

#### Description
Help can be provided in a lot of different ways. When and how you provide help depends on the amount of help needed, the type of process/interaction, and your target audience. Too much contextual help can actually make interfaces harder to understand, but insufficient help will frustrate new users.

Some of the ways help can be provided are:

- Dedicated help and FAQ page(s)
- Above and in forms ([See Forms page for examples](../components/forms.html#help-text))
- Below form input fields ([See Forms page for examples](../components/forms.html#help-text))
- Popovers when form input fields are focused ([See Forms page for examples](../components/forms.html#help-text))
- Popovers with definitions/descriptions when hovering over a label/term/word
- "Learn more" links and "Information" icons

&nbsp;

##### Dotted underlines
Use this for term definitions when a term may not be obvious to your target audience.

{::nomarkdown}
<div class="pl-preview">
<abbr data-toggle="popover" data-placement="top" data-container="body" data-trigger="hover" data-content="The person, group of persons, or organization that received ownership rights of the patent application or patent.">Assignee</abbr>: Smith, John D.
</div>
{:/nomarkdown}

{% highlight html %}
// HTML
{% endhighlight %}

&nbsp;

##### Input field focus popover
Use this when the information is only relevant once the user has focused the field.

{::nomarkdown}
<div class="pl-preview">
<form class="form-horizontal" role="form" style="max-width: 450px;">
    <div class="form-group" >
        <label for="po1" class="col-sm-3 control-label">Password</label>
        <div class="col-sm-9">
            <input class="form-control form-control-width-md" type="password" id="po1" data-html="true" data-toggle="popover" data-container="body" data-trigger="focus" data-content="Use at least 8 characters. Don’t use a password from another site, or something too obvious like your pet’s name. <a href=''>Why?</a>">
        </div>
    </div>
</form>
</div>
{:/nomarkdown}

{% highlight html %}
// HTML
{% endhighlight %}

&nbsp;

##### "Learn more" links
Use "Learn more" links to provide additional help text only when the user needs it. The links can reveal additional text in the form of a popover, a dedicated help page, or by expanding the text.

{::nomarkdown}
<div class="pl-preview">
<form style="max-width: 450px;" role="form">
    <div class="form-group">
        <div class="radio">
            <label><input type="radio" name="optionsRadios" id="optionsRadios1" checked value="option1">Standard characters <div class="text-muted">Use this option to register a mark that is comprised of word(s), letter(s), number(s), or any combination thereof with no design element or stylization. <a href="#">Learn more.</a></div></label>
        </div>
        <div class="radio">
            <label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Special form <div class="text-muted">Use this option if you wish to register a mark that is comprised of stylized word(s), letter(s), and/or number(s), and/or a design element. <a href="#">Learn more.</a></div></label>
        </div>
    </div>
</form>
</div>
{:/nomarkdown}

{% highlight html %}
// HTML
{% endhighlight %}


&nbsp;

##### "Information" icons
Use "Information" icons to provide explanations and elaborations for titles and panels.

{::nomarkdown}
<div class="pl-preview">
<div class="panel panel-default margin-2" style="max-width: 450px;">
    <div class="panel-heading">
        <h3 class="panel-title">Weekly traffic<i class="icon icon-info-circle icon-muted margin-left-1" data-toggle="popover" data-placement="top" data-container="body" data-trigger="hover" data-content="Only unique visits this week are counted. Repeat visitors during the same week are not counted."></i></h3>
    </div>
    <div class="panel-body">
        <p></p>
    </div>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
// HTML
{% endhighlight %}

</div>
