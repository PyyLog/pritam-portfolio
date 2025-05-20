import { Component, ElementRef, Renderer2, ViewChild, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
  primaryCircleSize = 0;
  secondaryCircleSize = 0;
  primaryCircleSizes = {
    mobile: 2.5,
    tablet: 3.0,
    laptop: 3.5,
    desktop: 4.0,
  };
  secondaryCircleSizes = {
    mobile: 0.9,
    tablet: 1.1,
    laptop: 1.25,
    desktop: 1.5,
  };
  currentScreenSize = 'laptop';
  minLineWidth = 0;
  maxLineWidth = 0;
  lineWidths = {
    mobile: {
      min: 8,
      max: 25,
    },
    tablet: {
      min: 10,
      max: 35,
    },
    laptop: {
      min: 15,
      max: 50,
    },
    desktop: {
      min: 20,
      max: 60,
    },
  };
  private readonly minWidthTimelineEventContainer = 12;
  colorTemplateByType: colorTemplateByType = {
    base: 'white',
    education: 'white',
    experience: 'gold',
    exchange: 'blue',
  };
  events: Event[] = EVENTS;
  selectedEvent: Event | null = null;
  isEducationMenuActive = false;
  isExperiencesMenuActive = false;

  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.setResponsiveSizes();
    this.setTimelineElementsStyles();
    this.createMenuTabs();
  }

  ngAfterViewInit(): void {
    this.setEntryAnimations();
  }

  setEntryAnimations(): void {
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;

    if (((windowWidth >= 320 && windowWidth < 768) || (windowWidth >= 768 && windowWidth < 1280)) && windowWidth < windowHeight) {
      // Mobile breakpoint
      gsap.from(this.titleCircle.nativeElement, {
        opacity: 0,
        y: -50,
        duration: 0.75,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.titleText.nativeElement, {
        opacity: 0,
        y: -65,
        duration: 0.75,
        delay: 0.5,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.timelineContainer.nativeElement, {
        opacity: 0,
        y: 35,
        duration: 0.75,
        delay: 0.65,
        ease: 'power2.inOut.out',
      });
    } else {
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
  }

  setResponsiveSizes(): void {
    const windowWidth: number = window.innerWidth;

    if (windowWidth >= 320 && windowWidth < 768) {
      // Mobile breakpoint
      this.currentScreenSize = 'mobile';
      this.primaryCircleSize = this.primaryCircleSizes.mobile;
      this.secondaryCircleSize = this.secondaryCircleSizes.mobile;
      this.minLineWidth = this.lineWidths.mobile.min;
      this.maxLineWidth = this.lineWidths.mobile.max;
    } else if (windowWidth >= 768 && windowWidth < 1280) {
      // Tablet breakpoint
      this.currentScreenSize = 'tablet';
      this.primaryCircleSize = this.primaryCircleSizes.tablet;
      this.secondaryCircleSize = this.secondaryCircleSizes.tablet;
      this.minLineWidth = this.lineWidths.tablet.min;
      this.maxLineWidth = this.lineWidths.tablet.max;
    } else if (windowWidth >= 1280 && windowWidth < 1920) {
      // Laptop breakpoint
      this.currentScreenSize = 'laptop';
      this.primaryCircleSize = this.primaryCircleSizes.laptop;
      this.secondaryCircleSize = this.secondaryCircleSizes.laptop;
      this.minLineWidth = this.lineWidths.laptop.min;
      this.maxLineWidth = this.lineWidths.laptop.max;
    } else {
      // Desktop breakpoint
      this.currentScreenSize = 'desktop';
      this.primaryCircleSize = this.primaryCircleSizes.desktop;
      this.secondaryCircleSize = this.secondaryCircleSizes.desktop;
      this.minLineWidth = this.lineWidths.desktop.min;
      this.maxLineWidth = this.lineWidths.desktop.max;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const previousScreenSize: string = this.currentScreenSize;
    this.setResponsiveSizes();
    if (previousScreenSize !== this.currentScreenSize) {
      this.updateTimelineElementSizes();
    }
  }

  updateTimelineElementSizes(): void {
    setTimeout((): void => {
      const timelineEventContainers: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.timeline-event-container');

      this.events.forEach((event: Event, i: number): void => {
        const isPrimary: boolean = event.importance === 'primary';
        const container: HTMLElement = timelineEventContainers[i];
        if (!container) return;

        // Update circle sizes
        const circleSelector = isPrimary ? '.primary-circle' : '.secondary-circle';
        const circle: HTMLElement | null = container.querySelector(circleSelector);
        if (!circle) return;

        const size: number = isPrimary ? this.primaryCircleSize : this.secondaryCircleSize;
        this.renderer.setStyle(circle, 'width', `${size}rem`);
        this.renderer.setStyle(circle, 'height', `${size}rem`);

        // Update line widths
        if (i < this.events.length - 1) {
          const timelineLine: HTMLElement | null = container.querySelector('.timeline-line');
          if (!timelineLine) return;

          const currentEventDate: number = new Date(event.date).getTime();
          const nextEventDate: number = new Date(this.events[i + 1].date).getTime();
          const firstEventDate: number = new Date(this.events[0].date).getTime();
          const lastEventDate: number = new Date(this.events[this.events.length - 1].date).getTime();

          const totalTimeSpan: number = lastEventDate - firstEventDate;
          const timeDifference: number = nextEventDate - currentEventDate;
          const widthRatio: number = timeDifference / totalTimeSpan;

          const lineWidth: number = this.minLineWidth + widthRatio * (this.maxLineWidth - this.minLineWidth);
          this.renderer.setStyle(timelineLine, 'width', `${lineWidth}rem`);
        }
      });
    }, 0);
  }

  setTimelineElementsStyles(): void {
    this.events.sort((a: Event, b: Event): number => new Date(a.date).getTime() - new Date(b.date).getTime());

    const firstEventDate: number = new Date(this.events[0].date).getTime();
    const lastEventDate: number = new Date(this.events[this.events.length - 1].date).getTime();
    const totalTimeSpan: number = lastEventDate - firstEventDate;

    setTimeout((): void => {
      const timelineEventContainers: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.timeline-event-container');

      this.events.forEach((event: Event, i: number): void => {
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

    this.events.forEach((event: Event, index: number): void => {
      const menuItem: HTMLElement = this.renderer.createElement('li');
      const itemText: HTMLElement = this.renderer.createElement('a');
      this.renderer.appendChild(itemText, this.renderer.createText(event.menuTitle));
      this.renderer.appendChild(menuItem, itemText);

      this.renderer.listen(menuItem, 'click', (): void => {
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

  // Add click outside listener to close menus when clicking elsewhere
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    // Get references to the menu containers
    const educationMenuContainer = this.el.nativeElement.querySelector('.menu-container:nth-child(1)');
    const experiencesMenuContainer = this.el.nativeElement.querySelector('.menu-container:nth-child(2)');

    // Check if the click was outside both menu containers
    if (educationMenuContainer && experiencesMenuContainer) {
      const clickedInEducationMenu: boolean = educationMenuContainer.contains(event.target);
      const clickedInExperiencesMenu: boolean = experiencesMenuContainer.contains(event.target);

      // If clicked outside both menus, close them
      if (!clickedInEducationMenu && !clickedInExperiencesMenu) {
        this.isEducationMenuActive = false;
        this.isExperiencesMenuActive = false;
      }
    }
  }

  // Toggle education menu visibility
  toggleEducationMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isEducationMenuActive = !this.isEducationMenuActive;

    if (this.isEducationMenuActive) {
      this.isExperiencesMenuActive = false;
    }
  }

  // Toggle experiences menu visibility
  toggleExperiencesMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isExperiencesMenuActive = !this.isExperiencesMenuActive;

    if (this.isExperiencesMenuActive) {
      this.isEducationMenuActive = false;
    }
  }
}
