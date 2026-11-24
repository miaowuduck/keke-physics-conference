import { useState } from 'react'
import { topics, type Speaker } from '../content'
import { Portrait } from './Portrait'
import { TopicMark } from './TopicMark'

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [pinned, setPinned] = useState(false)
  const topic = topics[speaker.topic]
  const panelId = `speaker-panel-${speaker.edition}-${speaker.name}`

  return (
    <button
      type="button"
      className="speaker-card group relative border-b-2 border-r-2 border-line bg-night text-left transition-colors duration-200 hover:bg-deep"
      aria-expanded={pinned}
      aria-controls={panelId}
      aria-label={`${speaker.name}，${speaker.edition}，${speaker.talkZh}`}
      onClick={() => setPinned((value) => !value)}
      onBlur={() => setPinned(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-line">
        <Portrait name={speaker.name} topic={speaker.topic} />
        <div
          id={panelId}
          className="speaker-panel absolute inset-x-0 bottom-0 top-[42%] overflow-y-auto border-t-2 border-gold bg-deeper p-4"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
            <TopicMark topic={speaker.topic} size={8} />
            {topic.zh} · {speaker.edition}
          </p>
          <p className="mt-2 text-[14px] font-medium leading-snug text-bone">
            {speaker.talkZh}
          </p>
          <p className="mt-2 text-[11.5px] leading-snug text-mute">
            {speaker.talkEn}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="display text-[22px] font-extrabold leading-none">
          {speaker.name}
        </h3>
        <p className="mt-2 text-[12.5px] text-mute">
          {speaker.pinyin} · {speaker.edition}
        </p>
        <p className="mt-2 flex items-start gap-2 font-mono text-[11.5px] leading-snug text-bone">
          <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-gold" />
          <span className="line-clamp-2">{speaker.talkZh}</span>
        </p>
      </div>
    </button>
  )
}
