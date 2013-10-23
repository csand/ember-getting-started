Todos.TodosController = Ember.ArrayController.extend({
  remaining: function() {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

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
    }
  }
});
