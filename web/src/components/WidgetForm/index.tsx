import { useState } from "react";

import bugImageUrl from '../../img/bug.svg';
import ideaImageUrl from '../../img/idea.svg';
import thoughtImageUrl from '../../img/thought.svg';
import { FeedBackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedbackTypes ={
    BUG:{
        title:'Problema',
        image: {
            source: bugImageUrl,
            alt:'BUG'
        },
    },
    IDEA:{
        title:'Ideia',
        image: {
            source: ideaImageUrl,
            alt:'IDEA'
        },
    },
    OTHER:{
        title:'Outro',
        image: {
            source: thoughtImageUrl,
            alt:'THOUGHT'
        },
    },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedBackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent ] = useState(false);

    function handleRestartFeedBack(){
        setFeedbackSent(false);
        setFeedBackType(null);
    
    } 

    return(
        <div className="bg-zinc-900 p-4 relative rounded-2xl mp-4 flex flex-col items-center shadow-lg  w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedBack} />
            ) : (
                <>
                    {!feedbackType ?(
                        <FeedBackTypeStep onFeedbackTypeChanged ={setFeedBackType} />
                    ) : (
                        <FeedBackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartResquested = {handleRestartFeedBack}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
                
            )}
            

            <footer className="text-xs text-neutral-400">
                Feito com amor por <a className="underline" href="https://github.com/DRodrigues17"> Daniel</a>
            </footer>
        </div>
    );
}