---
title: "Pagination"
---

<div class="pl-pattern">
<h3>Pagination</h3>

#### Purpose
Users need to navigate through pages of items.

#### Description
Collections of data are often split into multiple pages for performance reasons. Either the size of the data is too much to download at once, or the size of the data would take too long to render all at once. Pagination controls allow for the user to retrieve or view pages of data in a performant matter.

#### Basic functionality
This pagination pattern provides a few variations of the following features:

- Navigating to prev/next pages
- Navigating to first/last pages
- Jumping to a manually entered page/item
- Adjusting the number of items per page

The features should be chosen based on the user's needs, the data, and the space available. Don't include pagination features that aren't necessary. If your users have no need to adjust the paging size or jump to a manually entered page for a particular type of data, don't include those features.

&nbsp;

</div>

<div class="pl-pattern">

### Examples
The examples below show various configurations of pagination features. Depending on the data, you may treat your pages as item ranges `Showing 150-160` or as pages `Page 15 of 25`.

#### Full
These show possible configurations for layouts with large amounts of screen real estate. 


{::nomarkdown}
<div class="pl-preview">
<div class="btn-group">
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu1" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation" class="dropdown-header">Show up to</li>
            <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
        </ul>
    </div>
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu2" class="btn-link btn dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">
            <li role="presentation" class="dropdown-header">Jump to page</li>
            <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
                <form action="">
                    <div class="input-group">
                        <input type="text" placeholder="15" class="form-control"/>
                        <div class="input-group-btn">
                            <button class="btn btn-default">Go</button>
                        </div>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</div> <div class="btn-group">
    <a class="btn btn-default" href="#"><i class="icon icon-angle-left"></i></a>
    <a class="btn btn-default" href="#">1</a>
    <a class="btn btn-default" disabled href="#">...</a>
    <a class="btn btn-default" href="#">13</a>
    <a class="btn btn-default" href="#">14</a>
    <a class="btn btn-default active" href="#">15</a>
    <a class="btn btn-default" href="#">16</a>
    <a class="btn btn-default" href="#">17</a>
    <a class="btn btn-default" disabled href="#">...</a>
    <a class="btn btn-default" href="#">25</a>
    <a class="btn btn-default" href="#"><i class="icon icon-angle-right"></i></a>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group">
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu1" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation" class="dropdown-header">Show up to</li>
            <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
        </ul>
    </div>
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu2" class="btn-link btn dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">
            <li role="presentation" class="dropdown-header">Jump to page</li>
            <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
                <form action="">
                    <div class="input-group">
                        <input type="text" placeholder="15" class="form-control"/>
                        <div class="input-group-btn">
                            <button class="btn btn-default">Go</button>
                        </div>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</div> 
<div class="btn-group">
    <a class="btn btn-default" href="#"><i class="icon icon-angle-left"></i></a>
    <a class="btn btn-default" href="#">1</a>
    <a class="btn btn-default" disabled href="#">...</a>
    <a class="btn btn-default" href="#">13</a>
    <a class="btn btn-default" href="#">14</a>
    <a class="btn btn-default active" href="#">15</a>
    <a class="btn btn-default" href="#">16</a>
    <a class="btn btn-default" href="#">17</a>
    <a class="btn btn-default" disabled href="#">...</a>
    <a class="btn btn-default" href="#">25</a>
    <a class="btn btn-default" href="#"><i class="icon icon-angle-right"></i></a>
</div>
{% endhighlight %}


{::nomarkdown}
<div class="pl-preview">
<div class="btn-group">
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu9" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu9">
            <li role="presentation" class="dropdown-header">Show up to</li>
            <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
        </ul>
    </div>
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu10" class="btn-link btn dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu10">
            <li role="presentation" class="dropdown-header">Jump to page</li>
            <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
                <form action="">
                    <div class="input-group">
                        <input type="text" placeholder="15" class="form-control"/>
                        <div class="input-group-btn">
                            <button class="btn btn-default">Go</button>
                        </div>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</div> <div class="btn-group">
  <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
  <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group">
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu9" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu9">
            <li role="presentation" class="dropdown-header">Show up to</li>
            <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
        </ul>
    </div>
    <div class="btn-group dropdown">
        <button type="button" id="dropdownMenu10" class="btn-link btn dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu10">
            <li role="presentation" class="dropdown-header">Jump to page</li>
            <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
                <form action="">
                    <div class="input-group">
                        <input type="text" placeholder="15" class="form-control"/>
                        <div class="input-group-btn">
                            <button class="btn btn-default">Go</button>
                        </div>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</div>
<div class="btn-group">
    <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
    <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
{% endhighlight %}

#### Medium
These show possible configurations for layouts with limited screen real estate. 

{::nomarkdown}
<div class="pl-preview">
<div class="btn-group dropdown">
    <button type="button" id="dropdownMenu3" class="btn btn-link dropdown-toggle" data-toggle="dropdown">Showing 150-160 of 305 <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">
        <li role="presentation" class="dropdown-header">Jump to item</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div> <div class="btn-group">
  <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
  <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group dropdown">
    <button type="button" id="dropdownMenu3" class="btn btn-link dropdown-toggle" data-toggle="dropdown">Showing 150-160 of 305 <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">
        <li role="presentation" class="dropdown-header">Jump to item</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div>
<div class="btn-group">
    <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
<a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
{% endhighlight %}

{::nomarkdown}
<div class="pl-preview">
<div class="btn-group dropdown">
    <button type="button" id="dropdownMenu8" class="btn btn-link dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu8">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div> <div class="btn-group">
  <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
  <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group dropdown">
    <button type="button" id="dropdownMenu8" class="btn btn-link dropdown-toggle" data-toggle="dropdown">Page 15 of 25 <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu8">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div>
<div class="btn-group">
    <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
    <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
</div>
{% endhighlight %}

{::nomarkdown}
<div class="pl-preview">
<div class="btn-group dropdown">
        <button type="button" id="dropdownMenu1" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            <li role="presentation" class="dropdown-header">Show up to</li>
            <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
        </ul>
    </div> <div class="btn-group dropdown">
  <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
  <a id="dropdownMenu7" class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="">15/25 <span class="caret"></span></a>
  <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu7">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group dropdown">
    <button type="button" id="dropdownMenu1" class="btn-link btn dropdown-toggle" data-toggle="dropdown">10 per page <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
        <li role="presentation" class="dropdown-header">Show up to</li>
        <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
    </ul>
</div>
<div class="btn-group dropdown">
    <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
    <a id="dropdownMenu7" class="btn btn-default dropdown-toggle" data-toggle="dropdown" href="">15/25 <span class="caret"></span></a>
    <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu7">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
    </ul>
</div>
{% endhighlight %}

#### Small
A possible configuration for very narrow/confined layouts. 


{::nomarkdown}
<div class="pl-preview">
<div class="btn-group dropdown">
  <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
  <a class="btn btn-default dropdown-toggle" id="dropdownMenu6" data-toggle="dropdown" href="">15/25 <span class="caret"></span></a>
  <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu6">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
        <li class="divider"></li>
        <li role="presentation" class="dropdown-header">Show up to</li>
        <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
    </ul>
</div>
</div>
{:/nomarkdown}

{% highlight html %}
<div class="btn-group dropdown">
    <a href="#" class="btn btn-default"><i class="icon icon-angle-left"></i></a>
    <a class="btn btn-default dropdown-toggle" id="dropdownMenu6" data-toggle="dropdown" href="">15/25 <span class="caret"></span></a>
    <a href="#" class="btn btn-default"><i class="icon icon-angle-right"></i></a>
    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu6">
        <li role="presentation" class="dropdown-header">Jump to page</li>
        <li class="padding-left-2 padding-right-2 padding-top-1 padding-bottom-1" role="presentation">
            <form action="">
                <div class="input-group">
                    <input type="text" placeholder="15" class="form-control"/>
                    <div class="input-group-btn">
                        <button class="btn btn-default">Go</button>
                    </div>
                </div>
            </form>
        </li>
        <li class="divider"></li>
        <li role="presentation" class="dropdown-header">Show up to</li>
        <li role="presentation" class="active"><a role="menuitem" tabindex="-1" href="#">10 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">25 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">50 items</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">100 items</a></li>
    </ul>
</div>
{% endhighlight %}

</div>



