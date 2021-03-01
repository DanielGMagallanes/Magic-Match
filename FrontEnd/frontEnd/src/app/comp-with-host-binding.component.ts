import { Attribute, Component } from '@angular/core';

@Component({
  selector: 'app-my-input-with-attribute-decorator',
  template: 'The type of the input is: {{ type }}'
})
export class MyInputWithAttributeDecoratorComponent {
  constructor(@Attribute('type') public type: string) { }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/