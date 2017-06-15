import {GameManager} from "../states/game-manager";
import {Player} from "../world/actors/player";
import {ChunkConnections, DirectionActions} from "../world/chunk";
import {Action} from "../actions/action"

export class UI {
    public  static ACTION_ICON_SIZE: number = 40;
    private static ACTION_ICON_WIDTH: number = 45;

    private _container: Phaser.Graphics = null;

    constructor(private _game: GameManager, private _pc: Player) { 
        this._container = _game.game.add.graphics(0, 0);
    }

    get container(): Phaser.Graphics {
        return this._container;
    }

    update(delta: number) {
        this._container.removeChildren();

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
        var count = dispatchEvent.length - 1;

        arcX -= (UI.ACTION_ICON_SIZE * count) / 2;

        for (var action of displayList) {
            var icon = action.icon;

            if (icon == null) {
                continue;
            }

            this._container.addChild(icon);
            icon.x = arcX;
            icon.y = arcY;

            arcX += UI.ACTION_ICON_WIDTH;
        }
    }
}