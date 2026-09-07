import { isRemoteSpeakerImage, speakerInitials } from '../lib/speakerLineup.js'

/** @typedef {'table' | 'portrait' | 'lineup'} SpeakerAvatarVariant */

const VARIANT_CLASS = {
  table: {
    photo: 'lex-speaker-img',
    initial: 'lex-speaker-initials',
  },
  portrait: {
    photo: 'lex-lineup-img',
    initial: 'lex-lineup-initials',
  },
  lineup: {
    photo: 'lex-lineup-img',
    initial: 'lex-lineup-initials',
  },
}

export function SpeakerAvatar({ profile, variant = 'table' }) {
  const classes = VARIANT_CLASS[variant] ?? VARIANT_CLASS.table
  const objectPosition = profile.imagePosition || 'center 22%'
  const photoStyle = { objectPosition, backgroundPosition: objectPosition }

  return (
    <>
      <span className={classes.initial} aria-hidden="true">
        {speakerInitials(profile.name)}
      </span>
      {isRemoteSpeakerImage(profile.image) ? (
        <img className={classes.photo} src={profile.image} alt="" style={photoStyle} />
      ) : profile.slug && profile.image ? (
        <b
          className={`${classes.photo} lex-sp--${profile.slug}`}
          aria-hidden="true"
          style={photoStyle}
        >
          &nbsp;
        </b>
      ) : null}
    </>
  )
}
