Todos.TodoController = Ember.ObjectController.extend({
  isCompleted: function(key, value) {
    var model = this.get('model');

    if (_.isUndefined(value)) {
      // Property used as getter
      return model.get('isCompleted');
    } else {
      model.set('isCompleted', value);
      model.save();
      return value;
    }
  }.property('model.isCompleted'),

  isEditing: false,

  actions: {
    editTodo: function() {
      this.set('isEditing', true);
    },

    acceptChanges: function() {
      this.set('isEditing', false);

      if (_.isEmpty(this.get('model.title'))) {
        this.send('removeTodo');
      } else  {
        this.get('model').save();
      }
    },

    removeTodo: function() {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  }
});
