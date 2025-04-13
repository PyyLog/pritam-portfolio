import { Component, ElementRef, Renderer2, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENTS } from '../../data/timeline';
import { Event, colorTemplateByType } from '../../models/timeline.model';
import gsap from 'gsap';

@Component({
  selector: 'app-timeline-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit, AfterViewInit {
  private readonly minLineWidth: number = 15;
  private readonly maxLineWidth: number = 50;
  private readonly minWidthTimelineEventContainer = 12;
  private readonly primaryCircleSize: number = 3.5;
  private readonly secondaryCircleSize: number = 1.25;
  private colorTemplateByType: colorTemplateByType = {
    base: 'white',
    education: 'white',
    experience: 'gold',
    exchange: 'blue',
  };
  events: Event[] = EVENTS;
  selectedEvent: Event | null = null;

  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.setTimelineElementsStyles();
    this.createMenuTabs();
  }

  ngAfterViewInit(): void {
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
  }

  setTimelineElementsStyles(): void {
    this.events.sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const firstEventDate: number = new Date(this.events[0].date).getTime();
    const lastEventDate: number = new Date(this.events[this.events.length - 1].date).getTime();
    const totalTimeSpan: number = lastEventDate - firstEventDate;

    setTimeout(() => {
      const timelineEventContainers: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.timeline-event-container');

      this.events.forEach((event: Event, i: number) => {
        const isPrimary: boolean = event.importance === 'primary';
        const container: HTMLElement = timelineEventContainers[i];
        if (!container) return;

        // Timeline line creation
        if (i < this.events.length - 1) {
          const currentEventDate: number = new Date(event.date).getTime();
          const nextEventDate: number = new Date(this.events[i + 1].date).getTime();
          const timeDifference: number = nextEventDate - currentEventDate;
          const widthRatio: number = timeDifference / totalTimeSpan;
          const lineWidth: number = this.minLineWidth + widthRatio * (this.maxLineWidth - this.minLineWidth);

          const timelineLine: HTMLElement | null = container.querySelector('.timeline-line');
          if (!timelineLine) return;
          this.renderer.setStyle(timelineLine, 'width', `${lineWidth}rem`);
        }

        // Setting up the width, height and borders/ background of circles
        const circleSelector = isPrimary ? '.primary-circle' : '.secondary-circle';
        const circle: HTMLElement | null = container.querySelector(circleSelector);
        if (!circle) return;

        const size: number = isPrimary ? this.primaryCircleSize : this.secondaryCircleSize;
        this.renderer.setStyle(circle, 'width', `${size}rem`);
        this.renderer.setStyle(circle, 'height', `${size}rem`);

        if (isPrimary) {
          const color: string = this.colorTemplateByType[event.type] || this.colorTemplateByType['base'];
          this.renderer.setStyle(circle, 'border', `0.2rem solid ${color}`);
        } else {
          this.renderer.setStyle(circle, 'background', 'white');
        }

        // Setting the pointer when event description is not empty
        if (event.description !== '') {
          this.renderer.setStyle(circle, 'cursor', 'pointer');
        }

        // Setting up the min-width of the event point container
        const eventPointContainer: HTMLElement | null = container.querySelector('.event-point-container');
        if (!eventPointContainer) return;
        if (isPrimary) {
          this.renderer.setStyle(eventPointContainer, 'min-width', `${this.minWidthTimelineEventContainer}rem`);
        }

        // Setting up the date text in the corresponding div
        const eventDateText: HTMLElement | null = container.querySelector('.event-date-text');
        if (!eventDateText) return;
        this.renderer.appendChild(eventDateText, this.renderer.createText(this.formatDate(event.date)));

        // Setting up the event thumbnails alt text
        const eventThumbnail: HTMLElement | null = container.querySelector('.event-thumbnail');
        if (!eventThumbnail) return;
        const thumbnailPathLastPart: string = event.thumbnailPath.substring(event.thumbnailPath.lastIndexOf('/') + 1, event.thumbnailPath.length);
        const altText: string = thumbnailPathLastPart.substring(0, thumbnailPathLastPart.lastIndexOf('.'));

        this.renderer.setAttribute(eventThumbnail, 'alt', altText);
      });
    }, 0);
  }

  getAltTextEventIllustration(event: Event): string {
    const illustrationPathLastPart: string = event.illustrationPath.substring(
      event.illustrationPath.lastIndexOf('/') + 1,
      event.illustrationPath.length,
    );
    return illustrationPathLastPart.substring(0, illustrationPathLastPart.lastIndexOf('.'));
  }

  createMenuTabs(): void {
    const educationMenuList: HTMLElement = this.el.nativeElement.querySelector('.education-menu-list');
    const experiencesMenuList: HTMLElement = this.el.nativeElement.querySelector('.experiences-menu-list');

    if (!educationMenuList) return;
    if (!experiencesMenuList) return;

    this.events.forEach((event: Event, index: number) => {
      const menuItem: HTMLElement = this.renderer.createElement('li');
      const itemText: HTMLElement = this.renderer.createElement('a');
      this.renderer.appendChild(itemText, this.renderer.createText(event.menuTitle));
      this.renderer.appendChild(menuItem, itemText);

      this.renderer.listen(menuItem, 'click', () => {
        const timelineEvent: HTMLElement = this.el.nativeElement.querySelectorAll('.timeline-event-container')[index];
        if (timelineEvent) {
          timelineEvent.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
        }
      });

      if (event.type === 'education' || event.type === 'exchange') {
        this.renderer.appendChild(educationMenuList, menuItem);
        this.renderer.setStyle(educationMenuList, 'left', '0');
      } else if (event.type === 'experience') {
        this.renderer.appendChild(experiencesMenuList, menuItem);
        this.renderer.setStyle(experiencesMenuList, 'left', '0');
      }
    });
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}`;
  }

  showEventDetails(event: Event): void {
    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = null;
  }

  protected readonly close = close;
}
