import React, { memo } from 'react';
import { 
  Paper,
  MenuList,
  MenuItem,
  Button,
  Popper,
  Grow
} from '@mui/material';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '@/renderer/typing';

import s from './index.module.scss';
function ElementMenu() {
  const [collected, drag, dragPreview]: any[] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {id: 1}
  }), []);

  const [open, setOpen] = React.useState(false);
  const anchorEleRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorEleRef.current &&
      anchorEleRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className={s.elementMenu}>
      <Button
        ref={anchorEleRef}
        id='composition-button'
        className={s.menuBtn}
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        元素
      </Button>
      <Popper
        className={s.submenuWrap}
        open={open}
        anchorEl={anchorEleRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <MenuList
                autoFocusItem={open}
                id='composition-menu'
                className={s.submenuList}
                aria-labelledby='composition-button'
                onKeyDown={handleListKeyDown}
              >
                <MenuItem>
                  {collected.isDragging ? (
                    <section className={s.dragItem} ref={dragPreview}></section>
                  ) : (
                    <section className={s.dragItem} ref={drag}>gooooood!!!</section>
                  )}
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default memo(ElementMenu);
