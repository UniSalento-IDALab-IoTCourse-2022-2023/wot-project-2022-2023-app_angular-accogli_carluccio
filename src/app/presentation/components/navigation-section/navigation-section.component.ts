import {Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-section',
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss'
})
export class NavigationSectionComponent {

  constructor(private router: Router) {}

/*
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  onHover() {
    const backgroundSite = this.elementRef.nativeElement.ownerDocument.getElementById('linear-background');
    if (backgroundSite) {
      this.renderer.setStyle(backgroundSite, 'background', 'linear-gradient(270deg, rgba(73, 102, 117, 0.27), rgba(67, 133, 175, 0.33), #efdeff)');
      this.renderer.setStyle(backgroundSite, 'background-size', '150% 150%');
    }
  }

  onMouseLeave() {
    const backgroundSite = this.elementRef.nativeElement.ownerDocument.getElementById('linear-background');
    if (backgroundSite) {
      this.renderer.removeStyle(backgroundSite, 'background');
      this.renderer.setStyle(backgroundSite, 'background', 'linear-gradient(0deg, #13384D44, #13384D55, #EED9FFFF)');
      this.renderer.setStyle(backgroundSite, 'background-size', '150% 150%');
    }
  }
  */
  logout() {
    localStorage.removeItem("jwt")
    this.router.navigate([''])
  }
}
