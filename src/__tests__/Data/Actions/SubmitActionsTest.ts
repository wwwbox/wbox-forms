import {SubmitActions} from "../../../Data/Actions/Form/SubmitActions";
import {SubmitAction, SubmitActionType} from "../../../Data/Actions/Form/SubmitAction";

describe('SubmitActions', () => {
    it('should create submit start action', function () {
        const action = SubmitActions.submitStart();
        const expected: SubmitAction<undefined> = {
            type: SubmitActionType.SUBMIT_START,
            payload: undefined
        };
        expect(action).toEqual(expected);
    });

    it('should create submit fail action', function () {
        const action = SubmitActions.submitFail({message: 'test error'});
        const expected: SubmitAction<any> = {
            type: SubmitActionType.SUBMIT_FAIL,
            payload: {message: 'test error'}
        };
        expect(action).toEqual(expected);
    });

    it('should create submit succeed action', function () {
        const action = SubmitActions.submitSucceed({success: true});
        const expected: SubmitAction<any> = {
            type: SubmitActionType.SUBMIT_SUCCESS,
            payload: {success: true}
        };
        expect(action).toEqual(expected);
    });


    it('should create submit complete action', function () {
        const action = SubmitActions.submitComplete();
        const expected: SubmitAction<undefined> = {
            type: SubmitActionType.SUBMIT_COMPLETE,
            payload: undefined
        };
        expect(action).toEqual(expected);
    });
})