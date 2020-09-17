import { forwardRef, Inject, Injectable } from '@angular/core';
import {
    ActionService, AuditTrailService, ClientSidePropertiesService, ClipboardService, EventService, ExpressionService, HelperService,
    RenderStateService, StylablePropertyService, SubscriptionService, StylableProperties, BrushType, DocumentRef, TimerService, IAction,
    IBaseControl, IColor
} from '@blaise/core';

/**
 * The custom action service class provides extra functionality to the blaise core action service for handling custom actions
 */
@Injectable({
    providedIn: 'root'
})
export class CustomActionService extends ActionService {

    /**
     * Custom action service class constructor
     */
    public constructor(
        @Inject(forwardRef(() => AuditTrailService)) protected auditTrailService: AuditTrailService,
        @Inject(forwardRef(() => ClientSidePropertiesService)) protected clientSidePropertiesService: ClientSidePropertiesService,
        @Inject(forwardRef(() => ClipboardService)) protected clipboardService: ClipboardService,
        protected document: DocumentRef,
        @Inject(forwardRef(() => EventService)) protected eventService: EventService,
        @Inject(forwardRef(() => ExpressionService)) protected expressionService: ExpressionService,
        protected helperService: HelperService,
        @Inject(forwardRef(() => RenderStateService)) protected renderStateService: RenderStateService,
        @Inject(forwardRef(() => StylablePropertyService)) protected stylablePropertiesService: StylablePropertyService,
        @Inject(forwardRef(() => SubscriptionService)) protected subscriptionService: SubscriptionService,
        @Inject(forwardRef(() => TimerService)) protected timerService: TimerService,        
    ) {
        super(
            auditTrailService, clientSidePropertiesService, clipboardService, document, eventService, expressionService,
            helperService, renderStateService, stylablePropertiesService, subscriptionService, timerService
        );
    }

    /**
     * Function for custom actions
     * @param {IAction} actionObj
     * @param {string} controlID
     */
    protected custom(actionObj?: IAction, controlID?: string): void {
        if (controlID) {
            const subscription = this.subscriptionService.getControlSubscriptionById(controlID);
            const control: IBaseControl = subscription.getValue();
            const backgroundColorValue = {
                BrushType: BrushType.SolidColor,
                SolidColor: this.generateRandomColor()
            };
            this.stylablePropertiesService.setValueForStylableProperty(control, StylableProperties.Background, backgroundColorValue);
            subscription.next(control);
        }
    }

    private generateRandomColor(): IColor {
        return {
            R: this.randomIntFromInterval(0, 255),
            G: this.randomIntFromInterval(0, 255),
            B: this.randomIntFromInterval(0, 255),
            A: 255
        };
    }

    private randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

