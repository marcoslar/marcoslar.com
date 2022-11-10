---
title = "SanDisk Clip Sport Go M3U playlists"
---

The [SanDisk Clip Sport Go] mp3 player supports M3U playlists
but the playlist files must have [CRLF] terminators. If you are on
Windows, you don't need to worry about this, but on Unix-like systems
like MacOS you need a bit of glue code (on Linux you can use [dos2unix]).

*File `playlistme.sh`*
```
#!/bin/bash

playlistMe() {
  dir="$1"
  cd "$dir";
  echo "Creating playlist for: $dir"
  ls -A1;

  if ls -1 | egrep -i "\.(aac|mp3|m4a|wma|wav|flac|ogg)" &>/dev/null; then
    m3u="$dir.m3u"
    echo "#EXTM3U" > "$m3u"
    for audio_file in *.mp3; do
      echo -n "#EXTINF:0," >> "$m3u"
      echo "$audio_file" >> "$m3u"
      echo "$audio_file" >> "$m3u"
      echo "" >> "$m3u"
    done
    perl -pi -e 's/$/\r/' "$m3u"
  fi
  cd ..
}

playlistMe "$1"
```

If you run the script in a folder with some MP3s, you'll get a M3U playlist with CRLFs terminators.

```
$ playlistme music
Creating playlist for: music
Bruce Springsteen - Dancing In the Dark.mp3
Madonna - Into The Groove.mp3
The Prodigy - Firestarter.mp3
music.m3u
```

```
$ cat -e music/music.m3u
#EXTM3U^M$
#EXTINF:0,Bruce Springsteen - Dancing In the Dark.mp3^M$
Bruce Springsteen - Dancing In the Dark.mp3^M$
^M$
#EXTINF:0,Madonna - Into The Groove.mp3^M$
Madonna - Into The Groove.mp3^M$
^M$
#EXTINF:0,The Prodigy - Firestarter.mp3^M$
The Prodigy - Firestarter.mp3^M$
^M$
```

As you can see the CRLF line endings (`\r\n`) are displayed as `^M$`.

You can then just upload the `music` folder into your SanDisk.

[SanDisk Clip Sport Go]: https://en.wikipedia.org/wiki/SanDisk_portable_media_players#SanDisk_Clip_Sport_Go
[CRLF]: https://developer.mozilla.org/en-US/docs/Glossary/CRLF
[dos2unix]: https://linux.die.net/man/1/dos2unix