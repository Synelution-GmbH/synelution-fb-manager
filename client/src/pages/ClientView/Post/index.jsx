import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CardContent, Grid, makeStyles, Button, Tooltip } from '@material-ui/core';
import dayjs from 'dayjs';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { EditorClient, EditorIE } from 'ui/components/EditorClient';
import { useSocket } from 'services/socket-provider';
import { ReactEditor } from 'slate-react';
import { MessageBox } from 'pages/Posts/MessageBox';
import { ChangeImageButton } from '../ChangeImageBtn';
import { FreigebenBtn } from '../FreigebenBtn';
import { FacebookView } from './FacebookView';
import { InstagramView } from './InstagramView';
import { useQueryCache } from 'react-query';
import { IE } from 'utils';
import { useAuth } from 'services';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: '6px 16px 16px!important',
  },
}));

const PostView = ({ type, ...props }) => {
  return type === 'fb' ? (
    <FacebookView {...props} type={type} />
  ) : (
    <InstagramView {...props} type={type} />
  );
};

export const Post = ({ QUERY, date, approved, id, content, type, ...props }) => {
  const cache = useQueryCache();
  const classes = useStyles({ type });
  const editor = useRef();
  const socket = useSocket();
  const dateFormatted = useMemo(() => dayjs(date).format('D. MMMM'), [date]);
  const [clientText, setClientText] = useState(null);
  const [correctionMode, setCorrectionMode] = useState(false);
  const [msg, setMsg] = useState({ toggle: false, text: '' });
  const { user } = useAuth();
  // focus Edtior
  useEffect(() => {
    if (!editor.current || !correctionMode) return;
    if (!IE) ReactEditor.focus(editor.current);
    else editor.current.focus();
  }, [correctionMode]);

  return (
    <PostView
      {...props}
      type={type}
      dateFormatted={dateFormatted}
      editorComponent={
        !IE ? (
          <EditorClient
            editorRef={editor}
            disabled={!correctionMode}
            content={content}
            saveDelay={300}
            editorProps={{
              toolbar: false,
              style: {
                boxShadow: !correctionMode
                  ? 'none'
                  : 'box-shadow: inset 0px -3px 10px rgb(0 0 0 / 0.5)',
              },
            }}
            onSave={({ serializedValue }) => {
              setClientText(serializedValue);
              cache.invalidateQueries(QUERY);
            }}
            id={id}
          />
        ) : (
          <EditorIE
            editorRef={editor}
            disabled={!correctionMode}
            content={content}
            saveDelay={300}
            onSave={({ serializedValue }) => {
              setClientText(serializedValue);
              cache.invalidateQueries(QUERY);
            }}
            id={id}
          />
        )
      }
    >
      <CardContent className={classes.cardContent}>
        <Grid container justify="space-between">
          <FreigebenBtn approved={approved} id={id} QUERY={QUERY}></FreigebenBtn>
          <Grid item>
            <ChangeImageButton
              id={id}
              style={{ marginRight: '8px' }}
              color="primary"
              disabled={approved}
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
            <Tooltip
              title="Ändern Sie den Text gleich direkt am Post!"
              placement="top"
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={
                    <AwesomeIcon
                      style={{ fontSize: '100%' }}
                      icon={correctionMode ? 'check-circle' : 'pen'}
                    />
                  }
                  disabled={approved || (correctionMode && !clientText)}
                  onClick={() => {
                    if (correctionMode && clientText) {
                      const clientName = user.username;
                      const clientEmail = user.email;
                      socket.emit(
                        'client change',
                        {
                          id,
                          content: clientText,
                          clientCorrected: true,
                          clientName,
                          clientEmail,
                        },
                        () => {
                          setMsg({
                            toggle: !msg.toggle,
                            text: 'Korrektur wurde gespeichert!',
                            severity: 'success',
                          });
                        }
                      );

                      setClientText(null);
                    }
                    setCorrectionMode(!correctionMode);
                  }}
                >
                  {correctionMode ? 'Speichern' : 'Korrigieren'}
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
      <MessageBox autoHideDuration={15000} {...msg} />
    </PostView>
  );
};
