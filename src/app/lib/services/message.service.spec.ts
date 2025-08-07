import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { ToastrService } from 'ngx-toastr';

describe('MessageService', () => {
    let service: MessageService;
    let toastrSpy: jasmine.SpyObj<ToastrService>;

    beforeEach(() => {
        toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info', 'warning']);

        TestBed.configureTestingModule({
            providers: [
                MessageService,
                { provide: ToastrService, useValue: toastrSpy }
            ]
        });

        service = TestBed.inject(MessageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call toastr.success', () => {
        service.success('mensagem', 'título');
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toastrSpy.success).toHaveBeenCalledWith('mensagem', 'título');
    });

    it('should call toastr.error', () => {
        service.error('erro!', 'falhou');
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toastrSpy.error).toHaveBeenCalledWith('erro!', 'falhou');
    });

    it('should call toastr.info', () => {
        service.info('info', 'notificação');
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toastrSpy.info).toHaveBeenCalledWith('info', 'notificação');
    });

    it('should call toastr.warning', () => {
        service.warning('atenção', 'alerta');
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(toastrSpy.warning).toHaveBeenCalledWith('atenção', 'alerta');
    });
});
