---
title: "Typography"
---

<div class="pl-pattern">
### Fonts

Font load and fallback order: __Segoe UI, Helvetica Neue, Tahoma, Arial, sans-serif__

#### Font availability

{::nomarkdown}
<dl>
    <dt>Segoe UI</dt>
    <dd>Ships with Windows Vista and newer and Microsoft Office.</dd>
    <dt>Helvetica Neue</dt>
    <dd>Ships with OSX.</dd>
    <dt>Tahoma, Arial</dt>
    <dd>Ships with most operating systems.</dd>
</dl>
{:/nomarkdown}

&nbsp;

</div>

<div class="pl-pattern">
### Weights

{::nomarkdown}
<div class="pl-preview">
<div style="font-size: 15px">
    <p style="font-weight: 700">700 - Bold: The quick brown fox jumps over the lazy dog</p>
    <p style="font-weight: 600">600 - Semibold: The quick brown fox jumps over the lazy dog</p>
    <p style="font-weight: 400">400 - Regular: The quick brown fox jumps over the lazy dog</p>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<p style="font-weight: 700">700 - Bold: The quick brown fox jumps over the lazy dog</p>
<p style="font-weight: 600">600 - Semibold: The quick brown fox jumps over the lazy dog</p>
<p style="font-weight: 400">400 - Regular: The quick brown fox jumps over the lazy dog</p>
{% endhighlight %}

</div>

<div class="pl-pattern">
### Styles

#### Segoe UI
{::nomarkdown}
<div class="pl-preview">
<table class="table table-borderless table-valign" style="width: 550px;">
    <tbody>
        <tr>
            <td>Display 3</td>
            <td><h1 class="display3">Regular 56px</h1></td>
        </tr>
        <tr>
            <td>h1. Display 2</td>
            <td><h1>Regular 40px</h1></td>
        </tr>
        <tr>
            <td>h2. Display 1</td>
            <td><h2>Semibold 25px</h2></td>
        </tr>
        <tr>
            <td>h3. Headline</td>
            <td><h3 class="headline">Semibold 20px</h3></td>
        </tr>
        <tr>
            <td>h4. Title</td>
            <td><h4>Semibold 18px</h4></td>
        </tr>
        <tr>
            <td>h5. Subhead</td>
            <td><h5>Semibold 16px</h5></td>
        </tr>
        <tr>
            <td>h6.</td>
            <td><h6>Semibold 14px</h6></td>
        </tr>
        <tr>
            <td>Body</td>
            <td><div class="body">Regular 13px/14px</div></td>
        </tr>
        <tr>
            <td>Caption</td>
            <td><div class="caption">Regular 12px/13px</div></td>
        </tr>
    </tbody>
</table>
</div>
{:/nomarkdown}

{% highlight html %}
<h1 class="display3">Regular 56px</h1>
<h1>Regular 40px</h1>
<h2>Regular 25px</h2>
<h3>Bold 20px</h3>
<h4>Bold 18px</h4>
<h5>Bold 16px</h5>
<h6>Bold 14px</h6>
<p>Regular 13px/14px</p>
<div class="caption">Regular 12px/13px</div>
{% endhighlight %}

&nbsp;

#### Pairings
{::nomarkdown}
<div class="pl-preview">
<div style="max-width: 650px; line-height: 1.8;">
    <h1>Search for patents</h1>
    <h2 class="text-muted normal" style="margin-top: 18px;">New to Patent Searching? See this important information about searching for patents</h2>
    <h6 class="text-muted">Jul 14, 2015</h6>
    <hr>
    <p>Inventors are encouraged to search the USPTO's patent database to see if a patent has already been filed or granted that is similar to your patent. Patents may be searched in the USPTO Patent Full-Text and Image Database (PatFT). The USPTO houses full text for patents issued from 1976 to the present and PDF images for all patents from 1790 to the present.</p>
    <p>All sequences (SEQ ID NOs.) and tables for listed patents or publications are available for viewing, without downloading, by accessing the proper document detail page and then submitting a SEQ ID NO or a mega table ID number.</p>
    <h3>Global Patent Search Network (GPSN)</h3>
    <p>Global Patent Search Network (GPSN) enables users to search the full text of multiple international patent collections. The initial collection available will be Chinese patent documentation from the State Intellectual Property Office (SIPO) of the People's Republic of China. Users can search published applications, granted patents and utility models from1985 to 2012. The data available includes full text Chinese patents, English machine translations and full document images. This collection will be periodically updated to include additional years of coverage.</p>
    <h4>Searching full text patents (since 1976)</h4>
    <p>Customize a search on all or a selected group of elements (fields) of a patent.
        <ul class="list-unstyled">
            <li><a href="">Quick search</a></li>
            <li><a href="">Advanced search</a></li>
            <li><a href="">Patent number search</a></li>
        </ul>
    </p>
    <h3>Patent Application Information Retrieval (PAIR)</h3>
    <p>The Patent Application Information Retrieval (PAIR) system provides IP customers a safe, simple, and secure way to retrieve and download information regarding patent application status.
    <ul class="list-unstyled">
        <li><a href="">Visit PAIR</a></li>
    </ul></p>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<h2>Large display 1 heading</h2>
<h3>A headline</h3>
<p style="margin-bottom: 32px;">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
<h4>Smaller title</h4>
<h5>Subhead</h5>
<p style="margin-bottom: 32px;">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
<h5>Another subhead</h5>
<p style="margin-bottom: 32px;">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.</p>
{% endhighlight %}
</div>

<div class="pl-pattern">
### Lists

#### Unordered
{::nomarkdown}
<div class="pl-preview">
<ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3
        <ul>
            <li>Nested list item 1 </li>
            <li>Nested list item 2 </li>
        </ul>
    </li>
</ul>
</div>
{:/nomarkdown}

{% highlight html %}
<ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3
        <ul>
            <li>Nested list item 1 </li>
            <li>Nested list item 2 </li>
        </ul>
    </li>
</ul>
{% endhighlight %}

#### Ordered
{::nomarkdown}
<div class="pl-preview">
<ol>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3
        <ol>
            <li>Nested list item 1 </li>
            <li>Nested list item 2 </li>
        </ol>
    </li>
</ol>
</div>
{:/nomarkdown}

{% highlight html %}
<ol>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3
        <ol>
            <li>Nested list item 1 </li>
            <li>Nested list item 2 </li>
        </ol>
    </li>
</ol>
{% endhighlight %}
</div>

<div class="pl-pattern">
### Colors

{::nomarkdown}
<div class="pl-preview">
<p class="text-primary">This is text-primary</p>
<p class="text-warning">This is text-warning</p>
<p class="text-success">This is text-success</p>
<p class="text-danger">This is text-danger</p>
<p class="text-info">This is text-info</p>
<p class="text-muted">This is text-muted</p>
</div>
{:/nomarkdown}

{% highlight html %}
<p class="text-primary">This is text-primary</p>
<p class="text-warning">This is text-warning</p>
<p class="text-success">This is text-success</p>
<p class="text-danger">This is text-danger</p>
<p class="text-info">This is text-info</p>
<p class="text-muted">This is text-muted</p>
{% endhighlight %}

</div>
