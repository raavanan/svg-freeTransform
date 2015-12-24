var ActionsEnum = {
None: 0,
LeftResize: 1,
TopResize: 2,
RightResize: 3,
BottomResize: 4,
TopLeftResize: 5,
BottomLeftResize: 6,
TopRightResize: 7,
BottomRightResize: 8,
Move: 9
};

var currentAction = ActionsEnum.None;

var externalWrapperQueryStr = '#wrapper';

// Query strings for the action-triggers.
var moveActionTriggerQueryStr = externalWrapperQueryStr + ' .moveActionTrigger';
var topActionTriggerQueryStr = externalWrapperQueryStr + ' .topActionTrigger';
var bottomActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomActionTrigger';
var leftActionTriggerQueryStr = externalWrapperQueryStr + ' .leftActionTrigger';
var rightActionTriggerQueryStr = externalWrapperQueryStr + ' .rightActionTrigger';
var topLeftActionTriggerQueryStr = externalWrapperQueryStr + ' .topLeftActionTrigger';
var topRightActionTriggerQueryStr = externalWrapperQueryStr + ' .topRightActionTrigger';
var bottomLeftActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomLeftActionTrigger';
var bottomRightActionTriggerQueryStr = externalWrapperQueryStr + ' .bottomRightActionTrigger';

function initializeEventHandlers() {
    $(moveActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.Move;
    });

    $(topActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.TopResize;
    });

    $(bottomActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.BottomResize;
    });

    $(leftActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.LeftResize;
    });

    $(rightActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.RightResize;
    });

    $(topLeftActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.TopLeftResize;
    });

    $(topRightActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.TopRightResize;
    });

    $(bottomLeftActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.BottomLeftResize;
    });

    $(bottomRightActionTriggerQueryStr).mousedown(function (event) {
        currentAction = ActionsEnum.BottomRightResize;
    });

    $(document).mouseup(function (event) {
        // Clear the current action.
        currentAction = ActionsEnum.None;
    });

    $(document).mousemove(function (event) {
        onMouseMove(event);
    });

    $(document).mousemove(function (event) {
        onMouseMove(event);
    });
}
function onMouseMove(event) {
    var currMouseX = event.clientX;
    var currMouseY = event.clientY;

    var deltaX = currMouseX - lastMouseX;
    var deltaY = currMouseY - lastMouseY;

    applyMouseMoveAction(deltaX, deltaY);

    lastMouseX = event.pageX;
    lastMouseY = event.pageY;
}
function applyMouseMoveAction(deltaX, deltaY) {
    var deltaTop = 0;
    var deltaLeft = 0;
    var deltaWidth = 0;
    var deltaHeight = 0;

    if (currentAction == ActionsEnum.RightResize ||
        currentAction == ActionsEnum.TopRightResize ||
        currentAction == ActionsEnum.BottomRightResize) {
        deltaWidth = deltaX;
    }

    if (currentAction == ActionsEnum.LeftResize ||
        currentAction == ActionsEnum.TopLeftResize ||
        currentAction == ActionsEnum.BottomLeftResize) {
        deltaWidth = -deltaX;
        deltaLeft = deltaX;
    }

    if (currentAction == ActionsEnum.BottomResize ||
        currentAction == ActionsEnum.BottomLeftResize ||
        currentAction == ActionsEnum.BottomRightResize) {
        deltaHeight = deltaY;
    }

    if (currentAction == ActionsEnum.TopResize ||
        currentAction == ActionsEnum.TopLeftResize ||
        currentAction == ActionsEnum.TopRightResize) {
        deltaHeight = -deltaY;
        deltaTop = deltaY;
    }

    if (currentAction == ActionsEnum.Move) {
        deltaLeft = deltaX;
        deltaTop = deltaY;
    }

    updatePosition(deltaLeft, deltaTop);
    updateSize(deltaWidth, deltaHeight);
    adjustWrapper();
}
function updatePosition(deltaLeft, deltaTop) {
    // Calculate the new position.
    var elemLeft = parseInt($(externalWrapperQueryStr).css('left'));
    var elemTop = parseInt($(externalWrapperQueryStr).css('top'));
    var newLeft = elemLeft + deltaLeft;
    var newTop = elemTop + deltaTop;

    // Set the new position.
    $(externalWrapperQueryStr).css('left', newLeft + 'px');
    $(externalWrapperQueryStr).css('top', newTop + 'px');
}
function updateSize(deltaWidth, deltaHeight) {
    // Calculate the new size.
    var elemWidth = parseInt($("#myShape").width());
    var elemHeight = parseInt($("#myShape").height());
    var newWidth = elemWidth + deltaWidth;
    var newHeight = elemHeight + deltaHeight;

    // Don't allow a too small size.
    if (newWidth < 0) {
        newWidth = 0;
    }
    if (newHeight < 0) {
        newHeight = 0;
    }

    // Set the new size.
    $("#myShape").css('width', newWidth + 'px');
    $("#myShape").css('height', newHeight + 'px');
}
var internalWrapperQueryStr = externalWrapperQueryStr + ' .internalWrapper';

function adjustWrapper() {
    var elemWidth = $("#myShape").width();
    var elemHeight = $("#myShape").height();

    $(internalWrapperQueryStr).width(elemWidth);
    $(internalWrapperQueryStr).height(elemHeight);
    $(externalWrapperQueryStr).width(elemWidth);
    $(externalWrapperQueryStr).height(elemHeight);
}
$(function () {
    initializeEventHandlers();
});
