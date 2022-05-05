import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string;
    coment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbacksRespossitory: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, coment, screenshot } = request;

        if(!type){
            throw new Error('type is required');
        }

        if(!coment){
            throw new Error('comment is required');
        }

        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error('invalid screenshot format.')
        }


        await this.feedbacksRespossitory.create({
            type,
            coment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
            subject: "novo subject",
            body:[
                `<div style="font-family: sans:serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de feedback ${type}</p>`,
                `<p>Comentário: ${coment}</p>`,
                `</div>`,
            ].join('\n')
        })
    }
}