import { useState, useEffect } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

import styles from '~/components/levels/Levels.styles'

const Levels = ({ changeFunc }) => {
  const [selectedLevels, setSelectedLevels] = useState([])

  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Test Preparation',
    'Professional',
    'Specialized'
  ]

  useEffect(() => {
    changeFunc('proficiencyLevel', selectedLevels)
    /* eslint-disable-next-line */
  }, [selectedLevels])

  return (
    <FormGroup>
      {levels.map((level, index) => (
        <FormControlLabel
          control={<Checkbox sx={styles.checkbox} />}
          key={index}
          label={<Typography sx={styles.checkbox}>{level}</Typography>}
          onChange={(e) =>
            e.currentTarget.checked
              ? setSelectedLevels([...selectedLevels, e.currentTarget.value])
              : setSelectedLevels([
                  ...selectedLevels.filter((el) => el !== e.currentTarget.value)
                ])
          }
          value={level}
        />
      ))}
    </FormGroup>
  )
}

export default Levels
