
import { Component, ChangeDetectorRef, ElementRef, forwardRef, Inject, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, Observable, Subscription } from 'rxjs';
import { TextComponent, ServiceProviderService, Visibility, ToggleVisibilityAction, ITextControl } from '@blaise/core';

/**
 * Help text component class
 */
@Component({
    selector: 'div[data-help-text-component]',
    animations: [
        trigger('showHide', [
            state('shown', style({
                fontSize: '12px',
                opacity: 1
            })),
            state('hidden', style({
                fontSize: '0',
                opacity: 0.5
            })),
            transition('shown => hidden', [
                animate('1s')
            ]),
            transition('hidden => shown', [
                animate('0.1s')
            ]),
        ]),
    ],
    templateUrl: './help-text.component.html'
})
export class HelpTextComponent extends TextComponent implements OnInit, OnDestroy {

    /**
     *  Subject that will be watched by the observable
     * --Animal--
     */ 
    private isShown: Subject<boolean>;
    /**
     * Observable to watch the subject and send out a stream of updates
     * --Camera/VideoStream--
     */
    private isShown$: Observable<boolean>;
    /**
     * Subscribtion to observable change detection
     * --Narrator--
     */
    private isShownSubscription: Subscription;

    /**
     * Visibility result string
     */ 
    public isShownStr: string = 'shown';


    /**
     * Help text component class constructor
     * @param sp Service provider service
     * @param el element wrapper reference object
     * @param cd change detector reference object
     */
    public constructor(
        /**
         * sp Service provider service
         */
        @Inject(forwardRef(() => ServiceProviderService)) protected sp: ServiceProviderService,
        /**
         * el Help text component element wrapper
         */
        protected el: ElementRef,
        /**
         * cd Provides change detection functionality
         */
        protected cd: ChangeDetectorRef
    ) {
        super(sp, el, cd);
    }

    /**
     * Subscribes to the size tree ready event on component initialization
     */
    public ngOnInit(): void {
        super.ngOnInit();
        // subscribe to the size tree ready event
        this.isShown = new Subject<boolean>();
        this.isShown$ = this.isShown.asObservable();
        /* when visibility changes from hidden to visible: delay hide animation for 6s, hide control after 7s
           when visibility changes from visible to hidden: activate show animation immediatly to reset font size */
        this.isShownSubscription = this.isShown$.subscribe((isVisible: boolean) => {
            const nextState = isVisible ? 'hidden' : 'shown';
            const animationTimer = isVisible ? 6000 : 0;
            setTimeout(() => {
                // Set the next state to start animation
                this.isShownStr = nextState;
                // Make angular check for changes
                if (!this.cd['destroyed']) {
                    this.cd.detectChanges();
                }
            }, animationTimer);
            if (isVisible) {
                const autoHideTimer = animationTimer + 300;
                const hideAction = new ToggleVisibilityAction(null, this.controlId, Visibility.Collapsed);
                // Hide the visible control after the text has shrunk
                setTimeout(() => this.sp.actionService.handleAction(hideAction, this.controlId, "autoHide"), autoHideTimer);
            }
        });
    }

    /**
     * Subscribes to the size tree ready event on component initialization
     */
    public ngOnDestroy(): void {
        // unsubscribe from observable
        this.isShownSubscription.unsubscribe();
        // Continue normal destruction
        super.ngOnDestroy();
    }

    /**
     * Handles any control updates and (re)sets the button text
     * @param newDataObject base control
     */
    public handleControlUpdate(newDataObject: ITextControl) {
        super.handleControlUpdate(newDataObject);
        // Only after initialization
        if (this.isShown) {
            this.isShown.next(newDataObject.Visibility === Visibility.Visible);
        }
    }
}