import { Component, ElementRef, Renderer2, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { EVENTS } from '../../data/chronology';
import { TimelineEvent, colorTemplateByType } from '../../models/timeline.model';
import gsap from 'gsap';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [],
  templateUrl: './timeline-page.component.html',
  styleUrl: './timeline-page.component.scss',
})
export class TimelinePageComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly minLineWidth: number = 15;
  private readonly maxLineWidth: number = 50;
  private readonly circleSize: number = 3.5;
  private readonly borderRadiusCircle: number = 0.2;
  private colorTemplateByType: colorTemplateByType = {
    base: 'white',
    internship: 'gold',
    exchange: 'blue',
  };
  events: TimelineEvent[] = EVENTS;
  private observers: IntersectionObserver[] = [];

  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.generateTimeline();
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

    gsap.from(this.timelineContainer.nativeElement, {
      opacity: 0,
      x: 35,
      duration: 0.75,
      delay: 0.65,
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

  generateTimeline() {
    const timelineContainer: HTMLElement = this.el.nativeElement.querySelector('.timeline');
    this.events.sort((a, b) => a.date.getTime() - b.date.getTime());
    const firstEventDate = this.events[0].date.getTime();
    const lastEventDate = this.events[this.events.length - 1].date.getTime();
    const totalTimeSpan = lastEventDate - firstEventDate;

    if (!timelineContainer) {
      console.error('Timeline container not found');
      return;
    }

    for (let i = 0; i < this.events.length; i++) {
      const timelineSegment: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(timelineSegment, 'timeline-segment');
      this.renderer.setStyle(timelineSegment, 'flex-direction', 'row');
      this.renderer.setStyle(timelineSegment, 'align-items', 'center');

      const eventPointContainer: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventPointContainer, 'event-point-container');

      const eventDateText: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventDateText, 'event-date-text');

      const eventDate: HTMLElement = this.renderer.createText(this.formatDate(this.events[i].date));
      this.renderer.appendChild(eventDateText, eventDate);
      this.renderer.appendChild(eventPointContainer, eventDateText);

      const timelineCircle: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(timelineCircle, 'timeline-circle');
      this.renderer.setStyle(timelineCircle, 'width', `${this.circleSize}rem`);
      this.renderer.setStyle(timelineCircle, 'height', `${this.circleSize}rem`);
      this.renderer.setStyle(timelineCircle, 'border', `${this.borderRadiusCircle}rem solid ${this.colorTemplateByType[this.events[i].type]}`);
      this.renderer.appendChild(eventPointContainer, timelineCircle);

      const eventInfo: HTMLElement = this.renderer.createElement('div');
      this.renderer.addClass(eventInfo, 'event-info-text');

      const eventTitle: HTMLElement = this.renderer.createElement('h3');
      const eventDetails: HTMLElement = this.renderer.createElement('p');
      this.renderer.appendChild(eventTitle, this.renderer.createText(this.events[i].title));
      this.renderer.appendChild(eventDetails, this.renderer.createText(this.events[i].description));
      this.renderer.appendChild(eventInfo, eventTitle);
      this.renderer.appendChild(eventInfo, eventDetails);
      this.renderer.appendChild(eventPointContainer, eventInfo);
      this.renderer.appendChild(timelineSegment, eventPointContainer);

      if (i < this.events.length - 1) {
        const currentEventDate = this.events[i].date.getTime();
        const nextEventDate = this.events[i + 1].date.getTime();
        const timeDifference = nextEventDate - currentEventDate;
        const widthRatio = timeDifference / totalTimeSpan;
        const lineWidth = this.minLineWidth + widthRatio * (this.maxLineWidth - this.minLineWidth);

        const timelineLine: HTMLElement = this.renderer.createElement('div');
        this.renderer.addClass(timelineLine, 'timeline-line');
        this.renderer.setStyle(timelineLine, 'width', `${lineWidth}rem`);
        this.renderer.appendChild(timelineSegment, timelineLine);
      }
      this.renderer.appendChild(timelineContainer, timelineSegment);
    }
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}`;
  }
}
