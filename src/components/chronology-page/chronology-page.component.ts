import { Component, ElementRef, Renderer2, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EVENTS } from '../../data/chronology';
import gsap from 'gsap';

interface ChronologyEvent {
  id: number;
  date: Date;
  title: string;
  type: string;
  description: string;
}

type colorTemplateByType = Record<string, string>;

@Component({
  selector: 'app-chronology-page',
  standalone: true,
  imports: [],
  templateUrl: './chronology-page.component.html',
  styleUrl: './chronology-page.component.scss',
})
export class ChronologyPageComponent implements OnInit, AfterViewInit {
  private readonly minLineWidth: number = 15;
  private readonly maxLineWidth: number = 50;
  private readonly circleSize: number = 3.5;
  private readonly borderRadiusCircle: number = 0.2;
  private colorTemplateByType: colorTemplateByType = {
    base: 'white',
    internship: 'gold',
    exchange: 'blue',
  };
  events: ChronologyEvent[] = EVENTS;
  private observers: IntersectionObserver[] = [];
  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('chronologyContainer') chronologyContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.generateChronology();
  }

  ngOnDestroy() {
    this.observers.forEach(observer => observer.disconnect());
  }

  ngAfterViewInit() {
    gsap.from(this.titleCircle.nativeElement, {
      opacity: 0,
      x: -50,
      duration: 0.75,
      ease: 'power2.inOut.out',
    });
    gsap.from(this.titleText.nativeElement, {
      opacity: 0,
      x: -65,
      duration: 0.75,
      delay: 0.5,
      ease: 'power2.inOut.out',
    });
    gsap.from(this.chronologyContainer.nativeElement, {
      opacity: 0,
      x: 35,
      duration: 0.75,
      delay: 1,
      ease: 'power2.inOut.out',
    });

    this.setupIntersectionObservers();
  }

  setupIntersectionObservers() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const eventPoints = this.el.nativeElement.querySelectorAll('.event-point-container');

    eventPoints.forEach((point: HTMLElement) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const eventDateText = entry.target.querySelector('.event-date-text');
          const eventInfoText = entry.target.querySelector('.event-info-text');

          if (entry.isIntersecting) {
            gsap.to(eventDateText, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });

            gsap.to(eventInfoText, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          } else {
            gsap.to(eventDateText, {
              opacity: 0,
              y: 10,
              duration: 0.3,
            });

            gsap.to(eventInfoText, {
              opacity: 0,
              y: 10,
              duration: 0.3,
            });
          }
        });
      }, options);

      observer.observe(point);
      this.observers.push(observer);
    });
  }

  generateChronology() {
    const chronologyContainer: HTMLElement = this.el.nativeElement.querySelector('.chronology');
    if (!chronologyContainer) {
      console.error('Chronology container not found');
      return;
    }
    this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
    const firstEventDate = this.events[0].date.getTime();
    const lastEventDate = this.events[this.events.length - 1].date.getTime();
    const totalTimeSpan = lastEventDate - firstEventDate;

    for (let i = 0; i < this.events.length; i++) {
      const chronologySegment: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(chronologySegment, 'chronology-segment');
      this.renderer.setStyle(chronologySegment, 'flex-direction', 'row');
      this.renderer.setStyle(chronologySegment, 'align-items', 'center');

      const eventPointContainer: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventPointContainer, 'event-point-container');
      const eventDateText: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventDateText, 'event-date-text');
      const eventDate: HTMLElement = this.renderer.createText(this.formatDate(this.events[i].date));
      this.renderer.appendChild(eventDateText, eventDate);
      this.renderer.appendChild(eventPointContainer, eventDateText);
      const chronologyCircle: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(chronologyCircle, 'chronology-circle');
      this.renderer.setStyle(chronologyCircle, 'width', `${this.circleSize}rem`);
      this.renderer.setStyle(chronologyCircle, 'height', `${this.circleSize}rem`);
      this.renderer.setStyle(chronologyCircle, 'border', `${this.borderRadiusCircle}rem solid ${this.colorTemplateByType[this.events[i].type]}`);
      this.renderer.appendChild(eventPointContainer, chronologyCircle);
      const eventInfo: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventInfo, 'event-info-text');
      const eventTitle: HTMLElement = this.renderer.createElement('h3');
      const eventDetails: HTMLElement = this.renderer.createElement('p');
      this.renderer.appendChild(eventTitle, this.renderer.createText(this.events[i].title));
      this.renderer.appendChild(eventDetails, this.renderer.createText(this.events[i].description));
      this.renderer.appendChild(eventInfo, eventTitle);
      this.renderer.appendChild(eventInfo, eventDetails);
      this.renderer.appendChild(eventPointContainer, eventInfo);
      this.renderer.appendChild(chronologySegment, eventPointContainer);

      if (i < this.events.length - 1) {
        const currentEventDate = this.events[i].date.getTime();
        const nextEventDate = this.events[i + 1].date.getTime();
        const timeDifference = nextEventDate - currentEventDate;
        const widthRatio = timeDifference / totalTimeSpan;
        const lineWidth = this.minLineWidth + widthRatio * (this.maxLineWidth - this.minLineWidth);
        const chronologyLine: HTMLElement = this.renderer.createElement('div');
        this.renderer.addClass(chronologyLine, 'chronology-line');
        this.renderer.setStyle(chronologyLine, 'width', `${lineWidth}rem`);
        this.renderer.appendChild(chronologySegment, chronologyLine);
      }
      this.renderer.appendChild(chronologyContainer, chronologySegment);
    }
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}`;
  }
}
