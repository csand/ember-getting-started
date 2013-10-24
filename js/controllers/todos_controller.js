Todos.TodosController = Ember.ArrayController.extend({
  remaining: function() {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.filterProperty('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allCompleted: function(key, value) {
    if (_.isUndefined(value)) {
      return !!this.get('length') && this.everyBy('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('@each.isCompleted'),

  actions: {
    createTodo: function() {
      var title = this.get('newTitle');
      if (!title.trim()) return;

      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the input
      this.set('newTitle', '');

      todo.save();
    },

    clearCompleted: function() {
      var completed = this.filterProperty('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  }
});
