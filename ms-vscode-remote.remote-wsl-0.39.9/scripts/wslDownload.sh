#!/bin/sh
#
# Copyright (c) Microsoft Corporation. All rights reserved.
COMMIT=$1
QUALITY=$2
VSCODE_REMOTE_BIN=$3

# TESTING ENV VARIABLE VSCODE_SERVER_TAR

if [ "$VSCODE_WSL_DEBUG_INFO" = true ]; then
	set -x
fi

download()
{
	if [ ! "$(command -v wget)" ]; then
		echo "ERROR: Failed to download the VS Code server. 'wget' not installed." 1>&2
		echo "Please install wget:" 1>&2
		echo "Debian/Ubuntu: sudo apt-get install wget" 1>&2
		exit 14
	fi	

	local_name=$1
	if [ -f /etc/alpine-release ]; then
		local_url="https://update.code.visualstudio.com/commit:$COMMIT/server-linux-alpine/$QUALITY"
		wget -O "$local_name" "$local_url"
	else
		local_url="https://update.code.visualstudio.com/commit:$COMMIT/server-linux-x64/$QUALITY"
		printf "    "
		wget -O "$local_name" -o /dev/stdout --progress=dot "$local_url" 2>&1 | grep --line-buffered "%" | \
			sed -u -e "s,\.,,g" | awk '{printf("\b\b\b\b%4s", $2); fflush()}'
	fi
	if [ ! -s "$local_name" ]; then
		echo Failed
		set +e
		wget -O "$local_name" "$local_url"
		local_rc=$?;
		echo "ERROR: Failed to download $local_url to $local_name" 1>&2
		if [ $local_rc -eq 5 ]; then 
			echo "Please install missing certificates." 1>&2
			echo "Debian/Ubuntu:  sudo apt-get install ca-certificates" 1>&2
		fi
		exit 13
	fi
	printf "\b\b\b\b100%%\n"
}

# Check if this version is already installed
if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then
	set -e
	# Check if 
	if [ -f /etc/alpine-release ]; then
		if ! apk info | grep -qxe 'libstdc++'; then
			echo "libstdc++ is required to run the VSCode Server:"  1>&2
			echo "Please open a wsl shell as root ('wsl -d Alpine -u root') and run 'apk update && apk add libstdc++'" 1>&2
			exit 12
		fi
	fi

	# This version does not exist
	if [ -d "$VSCODE_REMOTE_BIN" ]; then
		echo "Updating VS Code Server to version $COMMIT"

		# Remove the previous installations
		echo "Removing previous installation...";
		rm -rf "$VSCODE_REMOTE_BIN/????????????????????????????????????????"
		rm -rf "$VSCODE_REMOTE_BIN/????????????????????????????????????????-??????????"
		rm -rf "$VSCODE_REMOTE_BIN/????????????????????????????????????????-??????????.tar.gz"

	else
		echo "Installing VS Code Server $COMMIT"
	fi

	mkdir -p "$VSCODE_REMOTE_BIN"

	# test if the server has already been downloaded on the windows side
	if [ "$VSCODE_SERVER_TAR" ]; then
		if [ -f "$VSCODE_SERVER_TAR" ]; then
			echo "Using server tar available at $VSCODE_SERVER_TAR"
			SERVER_TAR_FILE="$VSCODE_SERVER_TAR"
			printf "100%%\n"
		fi
	fi
	if [ ! "$SERVER_TAR_FILE" ]; then
		# Download the .tar.gz file
		SERVER_TAR_FILE="$VSCODE_REMOTE_BIN/$COMMIT-$(date +%s).tar.gz"
		printf "Downloading: ";
		download "$SERVER_TAR_FILE"
		REMOVE_SERVER_TAR_FILE=true		
	fi

	# Unpack the .tar.gz file to a temporary folder name
	printf "Unpacking:   0%%";
	TMP_EXTRACT_FOLDER="$VSCODE_REMOTE_BIN/$COMMIT-$(date +%s)"
	mkdir "$TMP_EXTRACT_FOLDER"

	FILE_COUNT=$(tar -tf "$SERVER_TAR_FILE" | wc -l)
	P=0;
	tar -xf "$SERVER_TAR_FILE" -C "$TMP_EXTRACT_FOLDER" --strip-components 1 --verbose | { I=1; while read -r _; do I=$((I+1)); PREV_P=$P; P=$((100 * I / FILE_COUNT)); if [ "$PREV_P" -ne "$P" ]; then PRETTY_P="$P%"; printf "\b\b\b\b%4s" $PRETTY_P; fi; done; echo ""; }

	# Remove the .tar.gz file
	if [ $REMOVE_SERVER_TAR_FILE ]; then
		rm "$SERVER_TAR_FILE"
	fi

	# Rename temporary folder to final folder name, retries needed due to WSL
	for _ in 1 2 3 4 5; do
		mv "$TMP_EXTRACT_FOLDER" "$VSCODE_REMOTE_BIN/$COMMIT" && break
		sleep 2
	done

	if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then
		echo "WARNING: Unable to move $TMP_EXTRACT_FOLDER. Trying copying instead." 1>&2
		cp -r "$TMP_EXTRACT_FOLDER" "$VSCODE_REMOTE_BIN/$COMMIT"
	fi

	if [ ! -d "$VSCODE_REMOTE_BIN/$COMMIT" ]; then
		echo "ERROR: Failed create $VSCODE_REMOTE_BIN/$COMMIT. Make sure all VSCode WSL windows are closed and try again." 1>&2
		exit 11
	fi
fi