import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-text-title',
  templateUrl: './text-title.component.html',
  styleUrl: './text-title.component.scss'
})
export class TextTitleComponent {

  @Input() title!: string

}
