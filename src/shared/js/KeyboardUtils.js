export class KeyboardUtils {
	static ENUM = {
		Keys : {
			ArrowUp: "ArrowUp",
			ArrowRight: "ArrowRight",
			ArrowDown: "ArrowDown",
			ArrowLeft: "ArrowLeft",
			Escape: "Escape",
			Enter: "Enter",
			Delete: "Delete",
			Backspace: "Backspace",
			PageUp: "PageUp",
			PageDown: "PageDown",
			Home: "Home",
			End: "End",
			Alt: "Alt",
			Control: "Control",
			Meta: "Meta",
		}
	}
	static keyNames = {
		[KeyboardUtils.ENUM.Keys.ArrowUp] :
			["ArrowUp", "Up"],
		[KeyboardUtils.ENUM.Keys.ArrowRight] :
			["ArrowRight", "Right" ],
		[KeyboardUtils.ENUM.Keys.ArrowDown] :
			["ArrowDown", "Down"],
		[KeyboardUtils.ENUM.Keys.ArrowLeft] :
			["ArrowLeft", "Left"],
		[KeyboardUtils.ENUM.Keys.Escape] :
			["Escape", "Esc"],
		[KeyboardUtils.ENUM.Keys.Enter] :
			["Enter"],
		[KeyboardUtils.ENUM.Keys.Backspace] :
			["Backspace"],
		[KeyboardUtils.ENUM.Keys.Delete] :
			["Delete"],
		[KeyboardUtils.ENUM.Keys.PageUp] :
			["PageUp"],
		[KeyboardUtils.ENUM.Keys.PageDown] :
			["PageDown"],
		[KeyboardUtils.ENUM.Keys.Home] :
			["Home"],
		[KeyboardUtils.ENUM.Keys.End] :
			["End"],
		[KeyboardUtils.ENUM.Keys.Alt] :
			["Alt"],
		[KeyboardUtils.ENUM.Keys.Control] :
			["Control"],
		[KeyboardUtils.ENUM.Keys.Meta] :
			["Meta"]
	}

	static iskey (
		/*String*/ keyValue,
		/*KeyboardUtils.Keys*/ keyEnum
	) {
		if( keyValue && keyEnum ) {
			let keyNames = KeyboardUtils.keyNames[keyEnum];
			return keyNames && keyNames && keyNames.includes(keyValue);
		}
		return undefined;
	}
}
