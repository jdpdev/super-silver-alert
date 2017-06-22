import {UI} from "./ui"
import {GameManager} from "../states/game-manager"
import {Item} from "../world/items/item"
import {TextureManager} from "../content/texture-manager"

/**
 * Displays the contents of the player's inventory
 */
export class Pack {
    private _container:Phaser.Group;
    private _redraw: boolean = false;

    constructor(private _game: GameManager, private _ui:UI) {
        _ui.player.inventory.pack = this;
        this._container = _game.game.add.group(_ui.container);

        this.wantRedraw();
    }

    setBounds(bounds: Phaser.Rectangle) {
        this._container.x = bounds.x;
        this._container.y = bounds.y;
    }

    wantRedraw() {
        this._redraw = true;
    }

    update(delta: number) {
        this.redraw();
    }

    /**
     * Redraw the pack
     */
    private redraw() {
        if (!this._redraw) {
            return;
        }

        this._container.removeAll();

        var items = this._ui.player.inventory.items;
        var iterator = items.values();
        var item = iterator.next();
        var i = 0;

        while (!item.done) {
            var sprite = this._game.game.add.sprite(50 * i, 5, null, null, this._container);
            sprite.setTexture(TextureManager.loadTexture(item.value.texture));

            i++;
            item = iterator.next();
        }

        this._redraw = false;
    }
}