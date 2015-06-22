---
title: "Metadata"
---

<div class="pl-pattern">
<h3>Metadata</h3>
The metadata pattern can be used for showing label/value pairs.

__Do__

- Consistently use `#` or `number` in labels
- Indicate empty/blank values with an em-dash (&mdash;)
- Reflow columns based on available screen real estate
- Sentence case labels


#### Horizontal
Useful for shorter labels/values.

{::nomarkdown}
<div class="pl-preview">
<div class="row">
    <div class="col-md-6">
        <dl class="dl-horizontal">
            <dt>Examiner</dt>
            <dd>IP, Sikyin / 69776 / 1742</dd>
            <dt>SPE (multiple)</dt>
            <dd>John Olaskey</dd>
            <dt>Applicants</dt>
            <dd>Roman Amirpur</dd>
            <dt>Inventors</dt>
            <dd>Disney Dale</dd>
            <dt>Law firm</dt>
            <dd>Clayton & Clayton Associates</dd>
        </dl>
    </div>
    <div class="col-md-6">
        <dl class="dl-horizontal">
            <dt>Confirmation #</dt>
            <dd>1662</dd>
            <dt>Publication #</dt>
            <dd><a href="">32132132132 <i class="icon icon-external-link"></i></a></dd>
            <dt>Patent #</dt>
            <dd>&mdash;</dd>
            <dt>Attorney docket #</dt>
            <dd>10951/1202</dd>
            <dt>Foreign priority claimed</dt>
            <dd>Yes</dd>
        </dl>
    </div>
</div>
</div>
{:/nomarkdown}


{% highlight html %}
<dl class="dl-horizontal">
    <dt>Confirmation #</dt>
    <dd>1662</dd>
    <dt>Patent #</dt>
    <dd>&mdash;</dd>
</dl>
{% endhighlight %}

#### Vertical
Useful for longer labels/values.

{::nomarkdown}
<div class="pl-preview">
<div class="row">
    <div class="col-sm-6">
        <dl>
            <dt>Examiner</dt>
            <dd>IP, Sikyin / 69776 / 1742</dd>
            <dt>SPE (multiple)</dt>
            <dd>John Olaskey</dd>
        </dl>
    </div>
    <div class="col-sm-6">
        <dl>
            <dt>Confirmation #</dt>
            <dd>1662</dd>
            <dt>Publication #</dt>
            <dd><a href="">32132132132 <i class="icon icon-external-link"></i></a></dd>
        </dl>
    </div>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<dl>
    <dt>Examiner</dt>
    <dd>IP, Sikyin / 69776 / 1742</dd>
    <dt>SPE (multiple)</dt>
    <dd>John Olaskey</dd>
</dl>
{% endhighlight %}

#### Inline
Useful for few labels/values.

{::nomarkdown}
<div class="pl-preview">
<div class="row">
    <div class="col-sm-12">
        <dl class="dl-inline">
            <dt>Created</dt>
            <dd>Mar 5, 2014</dd>
            <dt>Views</dt>
            <dd>1,662</dd>
            <dt>Status</dt>
            <dd>Approved</dd>
        </dl>
    </div>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<dl class="dl-inline">
    <dt>Created</dt>
    <dd>Mar 5, 2014</dd>
    <dt>Views</dt>
    <dd>1,662</dd>
    <dt>Status</dt>
    <dd>Approved</dd>
</dl>
{% endhighlight %}

</div>

