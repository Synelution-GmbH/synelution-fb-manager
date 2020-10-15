import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  styled,
  Grid,
  makeStyles,
  Avatar,
  Typography,
  Button,
} from '@material-ui/core';
import dayjs from 'dayjs';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { EditorClient } from 'ui/components/EditorClient';
import { useSocket } from 'services/socket-provider';
import { ReactEditor } from 'slate-react';
import { MessageBox } from 'pages/Posts/MessageBox';
import { ChangeImageButton } from '../ChangeImageBtn';
import { useQueryCache } from 'react-query';
import { FreigebenBtn } from '../FreigebenBtn';

const FB_CARD = styled(Card)({
  borderRadius: 'max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px',
  margin: '0 8px 16px',
  fontFamily: 'Helvetica',
  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
  fontSize: '16px',
  '-webkitFontSmoothing': 'antialiased',
  maxWidth: '500px',
});
const FB_CARD_CONTENT = styled(CardContent)({
  padding: '12px 16px 12px',
});

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    fontSize: '.9375em',
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    lineHeight: 1.3333,
  },
  date: {
    lineHeight: 1.2308,
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: '.8125em',
    color: '#65676b',
  },
  text: {
    fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
    fontSize: '.9375em',
    lineHeight: 1.34,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontWeight: 400,
    color: '#050505',
    unicodeBidi: '-webkit-isolate',
  },
  asset: {
    width: '100%',
  },
}));

export const FacebookPost = ({
  QUERY,
  date,
  approved,
  asset,
  id,
  content,
  client,
}) => {
  const classes = useStyles();
  const editor = useRef();
  const socket = useSocket();
  const dateFormatted = useMemo(() => dayjs(date).format('D. MMMM'), [date]);
  const [clientText, setClientText] = useState(null);
  const [correctionMode, setCorrectionMode] = useState(false);
  const [msg, setMsg] = useState({ toggle: false, text: '' });

  // focus Edtior
  useEffect(() => {
    if (!editor.current || !correctionMode) return;
    ReactEditor.focus(editor.current);
  }, [correctionMode]);

  return (
    <FB_CARD>
      <FB_CARD_CONTENT>
        <Grid container wrap="nowrap">
          <Avatar src={client.profilePicture} alt="" />
          <div style={{ flexGrow: 1, paddingLeft: '6px', marginBottom: '8px' }}>
            <Typography className={classes.title} variant="h6">
              {client.facebookName}
            </Typography>
            <Typography className={classes.date} variant="caption">
              {dateFormatted} · <AwesomeIcon icon="globe-americas" />
            </Typography>
          </div>
        </Grid>
      </FB_CARD_CONTENT>
      <div variant="div" className={classes.text}>
        <EditorClient
          editorRef={editor}
          disabled={!correctionMode}
          content={content}
          saveDelay={300}
          editorProps={{
            toolbar: false,
            style: { margin: '-28px -4px -8px', boxShadow: 'none' },
          }}
          onSave={({ serializedValue }) => {
            setClientText(serializedValue);
          }}
          id={id}
        />
      </div>
      {asset.image ? (
        <img className={classes.asset} src={asset.path} />
      ) : (
        <video className={classes.asset} src={asset.path}></video>
      )}
      <FB_CARD_CONTENT>
        <Grid container justify="space-between">
          <FreigebenBtn approved={approved} id={id} QUERY={QUERY}></FreigebenBtn>
          <Grid item>
            <ChangeImageButton
              id={id}
              style={{ marginRight: '8px' }}
              color="primary"
              onSave={() => {
                setMsg({
                  toggle: !msg.toggle,
                  text: 'Bild Korrektur wurde gespeichert!',
                  severity: 'success',
                });
              }}
            >
              Bild Korrekturen
            </ChangeImageButton>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <AwesomeIcon
                  style={{ fontSize: '100%' }}
                  icon={correctionMode ? 'check-circle' : 'pen'}
                />
              }
              disabled={correctionMode && !clientText}
              onClick={() => {
                if (correctionMode && clientText) {
                  socket.emit('client change', {
                    id,
                    content: clientText,
                    clientCorrected: true,
                  });
                  setMsg({
                    toggle: !msg.toggle,
                    text: 'Korrektur wurde gespeichert!',
                    severity: 'success',
                  });

                  setClientText(null);
                }
                setCorrectionMode(!correctionMode);
              }}
            >
              {correctionMode ? 'Speichern' : 'Korrigieren'}
            </Button>
          </Grid>
        </Grid>
      </FB_CARD_CONTENT>
      <MessageBox autoHideDuration={15000} {...msg} />
    </FB_CARD>
  );
};
