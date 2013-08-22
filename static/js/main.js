/* Models */
var Bookmark = Backbone.Model.extend({});

var BookmarkList = Backbone.Collection.extend({
  model: Bookmark,

  initialize: function(props) {
    this.bookmarkType = props.bookmarkType;
  },

  url: function() {
    return "/bookmarks/"+ this.bookmarkType + "/list";
  },

  parse: function(response) {
    return response.result;
  }
});


/* Views */
window.BookmarkListView = Backbone.View.extend({

  initialize: function() {
    var self = this;
    this.model.bind("reset", this.render, this);
    this.model.bind("add", function(application) {
      $(self.el).append(new BookmarkListItemView({
        model: application
      }).render().el);
    })

    this.model.fetch();
  },

  render: function(eventName) {
    $(this.el).empty();
    _.each(this.model.models, function(application) {
      $(this.el).append(new BookmarkListItemView({
        model: application
      }).render().el);
    }, this);

    return this;
  }
});

window.BookmarkListItemView = Backbone.View.extend({

  tagName:"li",

  template: _.template($('#bookmark-list-item').html()),

  initialize:function() {
    this.model.bind("change", this.render);
    this.model.bind("destroy", this.close);
  },

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});


var main = function() {
  var webappBookmarkView = new BookmarkListView({
    el: $("#bookmark-webapp-list"),
    model: new BookmarkList({
      bookmarkType: "webapp"
    })
  });

  var iosBookmarkView = new BookmarkListView({
    el: $("#bookmark-ios-list"),
    model: new BookmarkList({
      bookmarkType: "ios"
    })
  });

  var androidBookmarkView = new BookmarkListView({
    el: $("#bookmark-android-list"),
    model: new BookmarkList({
      bookmarkType: "android"
    })
  });
  var githubBookmarkView = new BookmarkListView({
    el: $("#bookmark-github-list"),
    model: new BookmarkList({
      bookmarkType: "github"
    })
  });
}();
