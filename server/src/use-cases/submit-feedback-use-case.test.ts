import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () =>{
    it('should be able to submit a feedback', async () => {
        

        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: 'exemplo aleatorio',
            screenshot: 'data:image/png;base64/teste.jpg',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback withot type ', async () => {
        await expect(submitFeedback.execute({
            type: '',
            coment: 'exemplo aleatorio',
            screenshot: 'data:image/png;base64/teste.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback withot coment ', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: '',
            screenshot: 'data:image/png;base64/teste.jpg',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with invalid screenshot type ', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: 'exemplo aleatorio',
            screenshot: 'teste.jpg',
        })).rejects.toThrow();
    });
});