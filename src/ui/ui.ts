import {GameManager} from "../states/game-manager";
import {Player} from "../world/actors/player";
import {ChunkConnections, DirectionActions} from "../world/chunk";
import {Action} from "../actions/action"
import {TextureManager} from "../content/texture-manager"

import {Pack} from "./pack"

export class UI {
    public  static ACTION_ICON_SIZE: number = 40;
    private static ACTION_ICON_WIDTH: number = 45;

    private _container: Phaser.Group = null;
    private _actionContainer: Phaser.Group = null;

    private _pack: Pack;

    constructor(private _game: GameManager, private _pc: Player) { 
        this._container = _game.game.add.group(_game.stage);
        this._actionContainer = _game.game.add.group(this._container);

        this._pack = new Pack(_game, this);
        this._pack.setBounds(new Phaser.Rectangle(10, 450, _game.game.stage.width - 20, _game.game.stage.height - 450));
    }

    get container(): Phaser.Group {
        return this._container;
    }

    get player(): Player {
        return this._pc;
    }

    update(delta: number) {
        this._pack.update(delta);

        this._actionContainer.removeChildren();

        var actions: ChunkConnections = this._pc.connections;
        
        if (actions == null) {
            return;
        }

        var x: number = this._pc.x - this._game.camera.x;
        var y: number = this._pc.y - this._game.camera.y - 120;

        if (actions.up != null) {
            this.drawUpActions(actions.up, x, y);
        }
    }

    private drawUpActions(actions: DirectionActions, x: number, y: number) {
        var arcX: number = x;
        var arcY: number = y;
        var displayList: Action[] = Array.isArray(actions) ? actions : [actions];
        var count = displayList.length - 1;

        arcX -= (UI.ACTION_ICON_WIDTH * count) / 2 + UI.ACTION_ICON_WIDTH / 2;

        for (var action of displayList) {
            var icon = TextureManager.loadTexture(action.icon);

            if (icon == null) {
                continue;
            }

            var sprite = this._game.game.add.sprite(arcX, arcY, null, null, this._actionContainer);
            sprite.texture = icon;

            arcX += UI.ACTION_ICON_WIDTH;
        }
    }
}