export class AnnotationQueryEditor {
  static templateUrl = 'partials/annotations.editor.html';

  annotation: any;

  constructor() {
    this.annotation.queryText = this.annotation.queryText || '';
  }
}
